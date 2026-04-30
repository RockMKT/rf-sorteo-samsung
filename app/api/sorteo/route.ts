import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import {
  sanitize,
  validateNombre,
  validateEmail,
  validateTelefono,
  validateFechaNacimiento,
  validateNumeroFactura,
  type FormErrors,
} from '@/lib/validation'
import { isRateLimited } from '@/lib/rate-limit'
import sgMail from '@sendgrid/mail'

const TEMPLATE_ID = 'd-6913d2e495874fff8ea194ee7f6c5449'
const FROM_EMAIL = 'noreply@rockandfellersba.com.ar'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor esperá un momento antes de intentar de nuevo.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { nombre, email, telefono, fecha_nacimiento, numero_factura, instagram } = body

    // Type guard — reject non-string values
    if (
      typeof nombre !== 'string' ||
      typeof email !== 'string' ||
      typeof telefono !== 'string' ||
      typeof fecha_nacimiento !== 'string' ||
      typeof numero_factura !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Datos inválidos.' },
        { status: 400 }
      )
    }

    // Sanitize inputs (strip control characters)
    const sNombre = sanitize(nombre)
    const sEmail = sanitize(email)
    const sTelefono = sanitize(telefono)
    const sFecha = sanitize(fecha_nacimiento)
    const sFactura = sanitize(numero_factura)
    const sInstagram = typeof instagram === 'string' ? sanitize(instagram) : null

    // Server-side field validation
    const errors: FormErrors = {}

    const errNombre = validateNombre(sNombre)
    if (errNombre) errors.nombre = errNombre

    const errEmail = validateEmail(sEmail)
    if (errEmail) errors.email = errEmail

    const errTelefono = validateTelefono(sTelefono)
    if (errTelefono) errors.telefono = errTelefono

    const errFecha = validateFechaNacimiento(sFecha)
    if (errFecha) errors.fecha_nacimiento = errFecha

    const errFactura = validateNumeroFactura(sFactura)
    if (errFactura) errors.numero_factura = errFactura

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      return NextResponse.json(
        { error: firstError, errors },
        { status: 400 }
      )
    }

    const trimmedCoupon = sFactura
    const trimmedEmail = sEmail.toLowerCase()
    const trimmedNombre = sNombre
    const trimmedTelefono = sTelefono

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
      `INSERT INTO raffle_participants (name, email, phone, date_of_birth, coupon_code, instagram)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [trimmedNombre, trimmedEmail, trimmedTelefono, sFecha, trimmedCoupon, sInstagram || null]
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
