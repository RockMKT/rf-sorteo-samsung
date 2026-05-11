'use client'

import { useEffect } from 'react'

interface Props {
  nombre: string
  email: string
  onClose: () => void
}

export default function ModalConfirmacion({ nombre, email, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-confirmacion-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-rf-carbon rounded-2xl p-8 shadow-2xl border border-rf-dorado/25 text-center"
        onClick={e => e.stopPropagation()}
      >
        <div
          aria-hidden="true"
          className="flex items-center justify-center w-14 h-14 rounded-full border border-rf-dorado/30 mx-auto mb-6"
          style={{ backgroundColor: 'rgba(196,171,75,0.08)' }}
        >
          <svg className="w-7 h-7 text-rf-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2
          id="modal-confirmacion-titulo"
          className="font-display text-xl uppercase text-rf-dorado mb-2"
        >
          Estás participando
        </h2>

        <p className="text-rf-texto/70 text-sm mb-1">
          <span className="text-rf-texto font-display">{nombre}</span>, tu participación fue
          registrada exitosamente.
        </p>
        <p className="text-rf-texto/50 text-sm mb-6">
          Te enviamos los detalles a{' '}
          <span className="text-rf-texto/80">{email}</span>.{' '}
          (Te sugerimos revisar casillas de promoción y spam en caso de no encontrar el correo.)
        </p>

        <img
          src="/sorteo.png"
          alt="Sorteo Samsung"
          className="w-full rounded-xl mb-6 object-contain"
        />

        <div className="flex flex-col gap-3">
          <a
            href="https://www.instagram.com/p/DYDMIRQklF8/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl font-display uppercase text-sm bg-dorado text-rf-negro hover:opacity-90 active:scale-[0.98] transition-all text-center"
          >
            Duplicá chances en Buenos Aires
          </a>
          <a
            href="https://www.instagram.com/p/DYAi-_iDNSM/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl font-display uppercase text-sm bg-dorado text-rf-negro hover:opacity-90 active:scale-[0.98] transition-all text-center"
          >
            Duplicá chances en Rosario
          </a>
        </div>
      </div>
    </div>
  )
}
