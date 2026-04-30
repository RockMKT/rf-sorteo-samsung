/** Strips control characters and trims. Returns '' for non-string inputs. */
export function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '').trim()
}

export interface FormErrors {
  nombre?: string
  email?: string
  telefono?: string
  fecha_nacimiento?: string
  numero_factura?: string
  acepta_terminos?: string
}

export function validateNombre(value: string): string | null {
  const v = value.trim()
  if (!v) return 'El nombre es obligatorio.'
  if (v.length > 100) return 'El nombre no puede superar los 100 caracteres.'
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/.test(v)) {
    return 'El nombre solo puede contener letras, espacios y guiones.'
  }
  return null
}

export function validateEmail(value: string): string | null {
  const v = value.trim()
  if (!v) return 'El email es obligatorio.'
  if (v.length > 254) return 'El email no puede superar los 254 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    return 'El email ingresado no es válido.'
  }
  return null
}

export function validateTelefono(value: string): string | null {
  const v = value.trim()
  if (!v) return 'El teléfono es obligatorio.'
  if (v.length > 20) return 'El teléfono no puede superar los 20 caracteres.'
  if (!/^[\d\s\-+()]+$/.test(v)) {
    return 'El teléfono solo puede contener números, espacios, guiones y paréntesis.'
  }
  return null
}

export function validateFechaNacimiento(value: string): string | null {
  if (!value) return 'La fecha de nacimiento es obligatoria.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'La fecha de nacimiento no es válida.'
  const date = new Date(value + 'T00:00:00')
  if (isNaN(date.getTime())) return 'La fecha de nacimiento no es válida.'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (date > today) return 'La fecha de nacimiento no puede ser futura.'
  const minAge = new Date(today)
  minAge.setFullYear(minAge.getFullYear() - 18)
  if (date > minAge) return 'Tenés que ser mayor de 18 años para participar.'
  return null
}

export function validateNumeroFactura(value: string): string | null {
  const v = value.trim()
  if (!v) return 'El código de cupón es obligatorio.'
  if (v.length > 15) return 'El código no puede superar los 15 caracteres.'
  if (!/^[a-zA-Z0-9\-]+$/.test(v)) {
    return 'El código solo puede contener letras, números y guiones.'
  }
  if (!/^[1-7]/.test(v)) {
    return 'El codigo ingresado no es valido'
  }
  return null
}

export function validateAceptaTerminos(value: boolean): string | null {
  if (!value) return 'Tenés que aceptar los términos y condiciones para participar.'
  return null
}

export function validateForm(data: {
  nombre: string
  email: string
  telefono: string
  fecha_nacimiento: string
  numero_factura: string
  acepta_terminos: boolean
}): FormErrors | null {
  const errors: FormErrors = {}

  const nombre = validateNombre(data.nombre)
  if (nombre) errors.nombre = nombre

  const email = validateEmail(data.email)
  if (email) errors.email = email

  const telefono = validateTelefono(data.telefono)
  if (telefono) errors.telefono = telefono

  const fecha = validateFechaNacimiento(data.fecha_nacimiento)
  if (fecha) errors.fecha_nacimiento = fecha

  const factura = validateNumeroFactura(data.numero_factura)
  if (factura) errors.numero_factura = factura

  const terminos = validateAceptaTerminos(data.acepta_terminos)
  if (terminos) errors.acepta_terminos = terminos

  return Object.keys(errors).length > 0 ? errors : null
}
