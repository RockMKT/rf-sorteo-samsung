'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'
import { useState } from 'react'
import ModalPedidoBA from './ModalPedidoBA'

const PEDIDOS_YA_ROSARIO = '#'


export default function SectionGiftCard() {
    const [modalBAOpen, setModalBAOpen] = useState(false)
  return (
    <>
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(196,171,75,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rf-dorado/20 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-xl mx-auto text-center">

          <FadeIn>
            <p className="text-[10px] font-display uppercase tracking-[0.35em] text-rf-dorado/60 mb-3">
              PARA ACOMPAÑAR TU NUEVO SMART TV
            </p>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-rf-texto mb-6">
              EL ROCK EN CASA
            </h2>
          </FadeIn>

          {/* Logo / imagen gift card — reemplazar src cuando esté la imagen definitiva */}
          <FadeIn delay={0.1}>
            <div className="relative w-full max-w-md h-64 mx-auto mb-8">
              <Image
                src="/PedidosYa.png"
                alt="Gift Card Rock&Feller's"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-rf-texto/50 text-sm leading-relaxed mb-8">
              Disfruta un combo mundialista exclusivo. Llevamos el rock a tu casa. Pedí por PedidosYa.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="text-center">
                      {/* Botones Pedir en... */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {/* Buenos Aires → abre modal */}
                        <button
                          onClick={() => setModalBAOpen(true)}
                          className="group flex items-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-rf-dorado text-rf-negro font-display text-sm uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-rf-dorado/20"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Pedir en Buenos Aires
                        </button>
          
                        {/* Rosario → link directo */}
                        <a
                          href={PEDIDOS_YA_ROSARIO}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-rf-dorado text-rf-negro font-display text-sm uppercase tracking-widest hover:bg-rf-dorado hover:text-rf-negro active:scale-[0.98] transition-all"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Pedir en Rosario
                        </a>
                      </div>
                    </FadeIn>

        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rf-dorado/20 to-transparent"
      />
    </section>
      {modalBAOpen && <ModalPedidoBA onClose={() => setModalBAOpen(false)} />}
    </>
  )
}
