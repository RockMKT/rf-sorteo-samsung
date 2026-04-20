import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  // Inicialización lazy para que el build no falle sin variables de entorno
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const body = await req.json()
    const { nombre, email, telefono, dni, numero_factura, canal, palabra } = body

    if (!nombre || !email || !telefono || !dni || !numero_factura || !canal || !palabra) {
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

    const { data: existingEmail } = await supabase
      .from('participantes')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle()

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Este email ya fue registrado en el sorteo.' },
        { status: 409 }
      )
    }

    const { data: existingFactura } = await supabase
      .from('participantes')
      .select('id')
      .eq('numero_factura', numero_factura.trim())
      .maybeSingle()

    if (existingFactura) {
      return NextResponse.json(
        { error: 'Este número de factura ya fue registrado.' },
        { status: 409 }
      )
    }

    const { error: insertError } = await supabase
      .from('participantes')
      .insert([
        {
          nombre: nombre.trim(),
          email: email.toLowerCase().trim(),
          telefono: telefono.trim(),
          dni: dni.trim(),
          numero_factura: numero_factura.trim(),
          canal,
          palabra,
        },
      ])

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json(
        { error: 'No pudimos registrar tu participación. Intentá de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Unexpected error in /api/sorteo:', err)
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado. Por favor intentá más tarde.' },
      { status: 500 }
    )
  }
}
