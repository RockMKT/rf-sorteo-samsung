'use client'

import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

// TODO: reemplazar cada href con el link real de PedidosYa de cada sucursal
const SUCURSALES_BA = [
  {
    nombre: 'Pilar',
    direccion: 'KM 50 | Complejo Hey Add Center',
    href: 'https://www.pedidosya.com.ar/restaurantes/pilar/rock-fellers-pilar-menu?search=rock', // TODO: link PedidosYa Pilar
  },
  {
    nombre: 'Unicenter',
    direccion: 'Unicenter Shopping',
    href: 'https://www.pedidosya.com.ar/restaurantes/san-isidro/rock--fellers-martinez-eeb556c4-f8fc-4977-8f67-1741fd2ce6e0-menu?origin=shop_list', // TODO: link PedidosYa Unicenter
  },
  {
    nombre: 'Palermo',
    direccion: 'Av. Dorrego esq. Libertador | Paseo OLA',
    href: 'https://www.pedidosya.com.ar/restaurantes/buenos-aires/rock--fellers--palermo-a9253a71-a49a-464f-890a-12af4f5d9809-menu', // TODO: link PedidosYa Palermo
  },
]

export default function ModalPedidoBA({ onClose }: Props) {
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
      aria-labelledby="modal-ba-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-rf-carbon border border-rf-dorado/20 rounded-2xl p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-display uppercase tracking-widest text-rf-dorado/60 mb-0.5">
              Pedir en
            </p>
            <h2
              id="modal-ba-titulo"
              className="font-display text-lg uppercase tracking-widest text-rf-texto"
            >
              Buenos Aires
            </h2>
          </div>
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

        {/* Botones de sucursales */}
        <div className="flex flex-col gap-3">
          {SUCURSALES_BA.map(({ nombre, direccion, href }) => (
            <a
              key={nombre}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-rf-gris border border-rf-dorado/10 hover:border-rf-dorado/40 rounded-xl px-4 py-3.5 transition-all duration-200"
            >
              <div className="text-left">
                <p className="font-display text-sm uppercase tracking-wider text-rf-texto group-hover:text-rf-dorado transition-colors">
                  Pedir en {nombre}
                </p>
                <p className="text-xs text-rf-texto/40 mt-0.5">{direccion}</p>
              </div>
              <svg
                className="w-4 h-4 text-rf-dorado/40 group-hover:text-rf-dorado group-hover:translate-x-0.5 transition-all flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
