import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import {
  validateNombre,
  validateEmail,
  validateTelefono,
  validateFechaNacimiento,
  validateNumeroFactura,
  validateSucursal,
  type FormErrors,
} from '@/lib/validation'
import sgMail from '@sendgrid/mail'

const TEMPLATE_ID = 'd-6913d2e495874fff8ea194ee7f6c5449'
const FROM_EMAIL = 'noreply@rockandfellersba.com.ar'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, telefono, fecha_nacimiento, numero_factura, sucursal } = body

    // Server-side field validation
    const errors: FormErrors = {}

    const errNombre = validateNombre(nombre ?? '')
    if (errNombre) errors.nombre = errNombre

    const errEmail = validateEmail(email ?? '')
    if (errEmail) errors.email = errEmail

    const errTelefono = validateTelefono(telefono ?? '')
    if (errTelefono) errors.telefono = errTelefono

    const errFecha = validateFechaNacimiento(fecha_nacimiento ?? '')
    if (errFecha) errors.fecha_nacimiento = errFecha

    const errFactura = validateNumeroFactura(numero_factura ?? '')
    if (errFactura) errors.numero_factura = errFactura

    const errSucursal = validateSucursal(sucursal ?? '')
    if (errSucursal) errors.sucursal = errSucursal

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      return NextResponse.json(
        { error: firstError, errors },
        { status: 400 }
      )
    }

    const trimmedCoupon = numero_factura.trim()
    const trimmedEmail = email.toLowerCase().trim()
    const trimmedNombre = nombre.trim()
    const trimmedTelefono = telefono.trim()

    // Check coupon code exists
    const couponResult = await pool.query(
      'SELECT id FROM coupon_codes WHERE code = $1',
      [trimmedCoupon]
    )

    if (couponResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'El código de cupón ingresado no es válido.', errors: { numero_factura: 'El código de cupón ingresado no es válido.' } },
        { status: 400 }
      )
    }

    // Check coupon not already used
    const existingResult = await pool.query(
      'SELECT id FROM raffle_participants WHERE coupon_code = $1',
      [trimmedCoupon]
    )

    if (existingResult.rows.length > 0) {
      return NextResponse.json(
        { error: 'Este código de cupón ya fue registrado.', errors: { numero_factura: 'Este código de cupón ya fue registrado.' } },
        { status: 409 }
      )
    }

    // Insert participant
    await pool.query(
      `INSERT INTO raffle_participants (name, email, phone, date_of_birth, coupon_code, subsidiary)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [trimmedNombre, trimmedEmail, trimmedTelefono, fecha_nacimiento, trimmedCoupon, sucursal]
    )

    // Send confirmation email
    if (process.env.SENDGRID) {
      try {
        sgMail.setApiKey(process.env.SENDGRID)
        await sgMail.send({
          to: trimmedEmail,
          from: FROM_EMAIL,
          templateId: TEMPLATE_ID,
          dynamicTemplateData: {
            nombre: trimmedNombre,
            email: trimmedEmail,
            sucursal,
            numero_factura: trimmedCoupon,
          },
        })
      } catch (mailErr: unknown) {
        try {
          const sgErr = mailErr as { response?: { body?: unknown }; message?: string }
          const detail = sgErr?.response?.body ?? sgErr?.message ?? String(mailErr)
          console.error('SendGrid error:', JSON.stringify(detail))
        } catch {
          console.error('SendGrid error (no se pudo serializar):', String(mailErr))
        }
      }
    } else {
      console.warn('Variable SENDGRID no configurada — se omite el envío de email')
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    console.error('Unexpected error in /api/sorteo:', msg)
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado. Por favor intentá más tarde.' },
      { status: 500 }
    )
  }
}
