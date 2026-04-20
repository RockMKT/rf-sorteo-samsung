'use client'

import { useState } from 'react'

const CANALES = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'amigo', label: 'Recomendación de un amigo/a' },
  { value: 'google', label: 'Google' },
  { value: 'ya-cliente', label: 'Ya era cliente' },
  { value: 'pase', label: 'Pasé por el local' },
  { value: 'otro', label: 'Otro' },
]

const PALABRAS = ['Innovación', 'Confiable', 'Tradición', 'Accesible', 'Estética']

interface Props {
  onSuccess: (data: { nombre: string; email: string }) => void
  onTerminosClick: () => void
}

interface FormData {
  nombre: string
  email: string
  telefono: string
  dni: string
  numero_factura: string
  canal: string
  palabra: string
  acepta_terminos: boolean
}

const EMPTY: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  dni: '',
  numero_factura: '',
  canal: '',
  palabra: '',
  acepta_terminos: false,
}

export default function FormSorteo({ onSuccess, onTerminosClick }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setErrorMsg(null)
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handlePalabra = (palabra: string) => {
    setErrorMsg(null)
    setForm(prev => ({ ...prev, palabra }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.acepta_terminos) {
      setErrorMsg('Tenés que aceptar los términos y condiciones para participar.')
      return
    }

    setIsLoading(true)
    setErrorMsg(null)

    try {
      const res = await fetch('/api/sorteo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          dni: form.dni,
          numero_factura: form.numero_factura,
          canal: form.canal,
          palabra: form.palabra,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Ocurrió un error. Por favor intentá de nuevo.')
        return
      }

      const submitted = { nombre: form.nombre, email: form.email }
      setForm(EMPTY)
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
        <label htmlFor="nombre" className="block text-[11px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
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
          autoComplete="name"
          className="input-rf"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-[11px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
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
      </div>

      {/* Teléfono + DNI */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="telefono" className="block text-[11px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
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
            autoComplete="tel"
            className="input-rf"
          />
        </div>
        <div>
          <label htmlFor="dni" className="block text-[11px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
            DNI <span className="text-red-400">*</span>
          </label>
          <input
            id="dni"
            type="text"
            name="dni"
            value={form.dni}
            onChange={handleChange}
            placeholder="Ingresá tu DNI"
            required
            inputMode="numeric"
            className="input-rf"
          />
        </div>
      </div>

      {/* Número de factura */}
      <div>
        <label htmlFor="numero_factura" className="block text-[11px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
          N° de factura <span className="text-red-400">*</span>
        </label>
        <input
          id="numero_factura"
          type="text"
          name="numero_factura"
          value={form.numero_factura}
          onChange={handleChange}
          placeholder="Ej: 0001-00012345"
          required
          className="input-rf"
        />
        <p className="text-[11px] text-rf-texto/30 mt-1 pl-1">
          Encontrás el número en la parte superior de tu factura.
        </p>
      </div>

      {/* Canal de descubrimiento */}
      <div>
        <label htmlFor="canal" className="block text-[11px] font-display uppercase tracking-widest text-rf-dorado/80 mb-1.5">
          ¿Por dónde conociste Rock&amp;Feller's? <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            id="canal"
            name="canal"
            value={form.canal}
            onChange={handleChange}
            required
            className="input-rf appearance-none pr-10 cursor-pointer"
          >
            <option value="" disabled>Seleccioná una opción</option>
            {CANALES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-rf-dorado/60">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Palabra de asociación */}
      <div>
        <p className="block text-[11px] font-display uppercase tracking-widest text-rf-dorado/80 mb-2">
          ¿Con qué palabra asociás a Rock&amp;Feller's? <span className="text-red-400">*</span>
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Palabra asociada a Rock&Feller's">
          {PALABRAS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => handlePalabra(p)}
              aria-pressed={form.palabra === p}
              className={[
                'px-4 py-2 text-xs font-display uppercase tracking-wider border transition-all duration-150',
                form.palabra === p
                  ? 'bg-rf-dorado text-rf-negro border-rf-dorado'
                  : 'bg-transparent text-rf-texto/60 border-rf-dorado/20 hover:border-rf-dorado/50 hover:text-rf-texto',
              ].join(' ')}
            >
              {p}
            </button>
          ))}
        </div>
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
