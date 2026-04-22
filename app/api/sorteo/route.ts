import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import sgMail from '@sendgrid/mail'

const TEMPLATE_ID = 'd-6913d2e495874fff8ea194ee7f6c5449'
const FROM_EMAIL = 'noreply@rockandfellersba.com.ar'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, telefono, fecha_nacimiento, numero_factura, sucursal } = body

    if (!nombre || !email || !telefono || !fecha_nacimiento || !numero_factura || !sucursal) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El email ingresado no es válido.' },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    const [existingEmail] = await sql`
      SELECT id FROM participantes
      WHERE email = ${email.toLowerCase().trim()}
      LIMIT 1
    `

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Este email ya fue registrado en el sorteo.' },
        { status: 409 }
      )
    }

    const [existingFactura] = await sql`
      SELECT id FROM participantes
      WHERE numero_factura = ${numero_factura.trim()}
      LIMIT 1
    `

    if (existingFactura) {
      return NextResponse.json(
        { error: 'Este número de factura ya fue registrado.' },
        { status: 409 }
      )
    }

    await sql`
      INSERT INTO participantes (nombre, email, telefono, fecha_nacimiento, numero_factura, sucursal)
      VALUES (
        ${nombre.trim()},
        ${email.toLowerCase().trim()},
        ${telefono.trim()},
        ${fecha_nacimiento},
        ${numero_factura.trim()},
        ${sucursal}
      )
    `

    sgMail.setApiKey(process.env.SENDGRID!)
    await sgMail.send({
      to: email.toLowerCase().trim(),
      from: FROM_EMAIL,
      templateId: TEMPLATE_ID,
      dynamicTemplateData: {
        nombre: nombre.trim(),
        email: email.toLowerCase().trim(),
        sucursal,
        numero_factura: numero_factura.trim(),
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Unexpected error in /api/sorteo:', err)
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado. Por favor intentá más tarde.' },
      { status: 500 }
    )
  }
}
