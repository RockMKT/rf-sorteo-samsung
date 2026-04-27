'use client'

import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

export default function ModalTerminos({ onClose }: Props) {
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
      aria-labelledby="modal-terminos-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-rf-carbon rounded-2xl p-6 shadow-2xl border border-rf-dorado/20 flex flex-col max-h-[88vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-5">
          <h2
            id="modal-terminos-titulo"
            className="font-display text-base uppercase tracking-widest text-rf-dorado"
          >
            Términos y Condiciones
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-rf-texto/40 hover:text-rf-dorado transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto flex-1 text-sm text-rf-texto/70 space-y-4 pr-1">
          <p className="text-[10px] font-display uppercase tracking-widest text-rf-dorado/50 mb-4">
            Bases del sorteo
          </p>

          <p>
            <span className="font-display text-rf-dorado text-xs mr-2">1.</span>
            El sorteo es válido para mayores de 18 años residentes en la República Argentina.
          </p>

          <p>
            <span className="font-display text-rf-dorado text-xs mr-2">2.</span>
            Cada factura válida emitida en cualquier sucursal de Rock&Feller's otorga
            participaciones correspondientes a la cantidad de Clientes en mesa en el momento de consumición.
          </p>

          <p>
            <span className="font-display text-rf-dorado text-xs mr-2">3.</span>
            El ganador será seleccionado de forma aleatoria entre todos los participantes registrados
            y será contactado por email y teléfono dentro de las 72 horas posteriores al sorteo.
          </p>

          <p>
            <span className="font-display text-rf-dorado text-xs mr-2">4.</span>
            El sorteo tendrá como premio 1 Smart TV de 98”. Características técnicas del producto serán definidos por la organización según disponibilidad comercial al momento de adquisición del mismo. La imagen, descripción o referencia visual utilizada en piezas de comunicación será meramente ilustrativa y no implicará compromiso sobre un modelo específico. El premio no podrá ser transferido, canjeado por dinero en efectivo ni reemplazado por otros productos a solicitud del ganador.
          </p>

          <p>
            <span className="font-display text-rf-dorado text-xs mr-2">5.</span>
            Cada número de cupón puede ser registrado una única vez. Los datos ingresados deben
            ser verídicos.
          </p>

          <p>
            <span className="font-display text-rf-dorado text-xs mr-2">6.</span>
            Rock&Feller's se reserva el derecho de verificar la autenticidad de los cupones
            presentadas. En caso de detectar datos falsos o manipulados, la participación será
            descalificada.
          </p>

          <p>
            <span className="font-display text-rf-dorado text-xs mr-2">7.</span>
            Los datos personales recopilados serán utilizados exclusivamente a los fines de este
            sorteo, en cumplimiento de la Ley 25.326 de Protección de Datos Personales.
          </p>
        </div>

        {/* Pie */}
        <div className="mt-5 pt-4 border-t border-rf-dorado/10">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-display uppercase tracking-widest text-sm bg-gradient-dorado text-rf-negro hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
