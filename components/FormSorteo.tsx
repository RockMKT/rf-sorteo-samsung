'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { validateForm, type FormErrors } from '@/lib/validation'

interface Props {
  onSuccess: (data: { nombre: string; email: string }) => void
  onTerminosClick: () => void
}

interface FormData {
  nombre: string
  email: string
  telefono: string
  fecha_nacimiento: string
  numero_factura: string
  instagram: string
  acepta_terminos: boolean
}

const EMPTY: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  fecha_nacimiento: '',
  numero_factura: '',
  instagram: '',
  acepta_terminos: false,
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-red-400 text-[11px] mt-1 pl-1">{message}</p>
}

export default function FormSorteo({ onSuccess, onTerminosClick }: Props) {
  const searchParams = useSearchParams()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})

  useEffect(() => {
    const coupon = searchParams.get('coupon')
    if (coupon) {
      setForm(prev => ({ ...prev, numero_factura: coupon }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setErrorMsg(null)
    setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const errors = validateForm({
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      fecha_nacimiento: form.fecha_nacimiento,
      numero_factura: form.numero_factura,
      acepta_terminos: form.acepta_terminos,
    })

    if (errors) {
      setFieldErrors(errors)
      const firstError = Object.values(errors)[0]
      if (firstError) setErrorMsg(firstError)
      return
    }

    setIsLoading(true)
    setErrorMsg(null)
    setFieldErrors({})

    try {
      const res = await fetch('/api/sorteo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          fecha_nacimiento: form.fecha_nacimiento,
          numero_factura: form.numero_factura,
          instagram: form.instagram,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Ocurrió un error. Por favor intentá de nuevo.')
        if (data.errors) {
          setFieldErrors(data.errors)
        }
        return
      }

      const submitted = { nombre: form.nombre, email: form.email }
      setForm(EMPTY)
      setFieldErrors({})
      onSuccess(submitted)
    } catch {
      setErrorMsg('Ocurrió un error inesperado. Por favor intentá más tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Nombre completo */}
      <div>
        <label htmlFor="nombre" className="block text-[10px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
          Nombre y apellido <span className="text-red-400">*</span>
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ingresá tu nombre"
          required
          maxLength={100}
          autoComplete="name"
          className="input-rf"
        />
        <FieldError message={fieldErrors.nombre} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-[10px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Ingresá tu correo"
          required
          autoComplete="email"
          className="input-rf"
        />
        <FieldError message={fieldErrors.email} />
      </div>

      {/* Teléfono + Fecha de nacimiento */}
      <div className="grid grid-cols-[0.65fr_1.35fr] gap-3">
        <div className="min-w-0">
          <label htmlFor="telefono" className="block text-[10px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
            Teléfono <span className="text-red-400">*</span>
          </label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            maxLength={20}
            autoComplete="tel"
            className="input-rf"
          />
          <FieldError message={fieldErrors.telefono} />
        </div>
        <div className="min-w-0 w-full overflow-hidden">
          <label htmlFor="fecha_nacimiento" className="block text-[10px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
            Fecha de nacimiento <span className="text-red-400">*</span>
          </label>
          <input
            id="fecha_nacimiento"
            type="date"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
            className="input-rf w-full min-w-0 max-w-full box-border"
          />
          <FieldError message={fieldErrors.fecha_nacimiento} />
        </div>
      </div>

      {/* Código de cupón */}
      <div>
        <label htmlFor="numero_factura" className="block text-[10px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
          Código de cupón <span className="text-red-400">*</span>
        </label>
        <input
          id="numero_factura"
          type="text"
          name="numero_factura"
          value={form.numero_factura}
          onChange={handleChange}
          required
          maxLength={15}
          className="input-rf"
        />
        <FieldError message={fieldErrors.numero_factura} />
        <p className="text-[11px] text-rf-texto/30 mt-1 pl-1">
          Escaneá el QR de tu cupón.
        </p>
      </div>

      {/* Instagram */}
      <div>
        <label htmlFor="instagram" className="block text-[10px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
          Usuario de Instagram
        </label>
        <input
          id="instagram"
          type="text"
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
          placeholder="@tu_usuario"
          maxLength={50}
          className="input-rf"
        />
      </div>

      {/* Términos */}
      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          id="acepta_terminos"
          name="acepta_terminos"
          checked={form.acepta_terminos}
          onChange={handleChange}
          className="mt-0.5 w-4 h-4 cursor-pointer flex-shrink-0 accent-rf-dorado"
        />
        <label htmlFor="acepta_terminos" className="text-xs text-rf-texto/50 leading-relaxed cursor-pointer">
          Acepto los{' '}
          <button
            type="button"
            onClick={onTerminosClick}
            className="text-rf-dorado underline-offset-2 hover:underline"
          >
            Términos y Condiciones
          </button>{' '}
          del sorteo y autorizo el uso de mis datos personales (Ley 25.326).
        </label>
      </div>
      <FieldError message={fieldErrors.acepta_terminos} />

      {/* Error */}
      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-2.5 bg-red-500/8 border border-red-500/25 px-4 py-3"
        >
          <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 mt-1 font-display uppercase tracking-[0.15em] text-sm bg-gradient-dorado text-rf-negro hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rf-dorado/15"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Registrando...
          </span>
        ) : (
          'Participar'
        )}
      </button>
    </form>
  )
}
