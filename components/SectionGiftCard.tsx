'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'

export default function SectionGiftCard() {
  return (
    <section className="py-20 md:py-28 bg-rf-negro relative overflow-hidden">
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
              El detalle perfecto
            </p>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-rf-texto mb-6">
              Regalá R&amp;F
            </h2>
          </FadeIn>

          {/* Logo / imagen gift card — reemplazar src cuando esté la imagen definitiva */}
          <FadeIn delay={0.1}>
            <div className="relative w-full max-w-md h-64 mx-auto mb-8">
              <Image
                src="/giftcards.png"
                alt="Gift Card Rock&Feller's"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-rf-texto/50 text-sm leading-relaxed mb-8">
              El regalo perfecto para cumpleaños, aniversarios, fechas especiales o simplemente… porque sí.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ul className="space-y-3 mb-10 text-left inline-flex flex-col">
              {[
                'Sin vencimiento',
                'Válida en todas las sucursales',
                'Disponible por monto y por experiencia',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-rf-texto/60">
                  <span className="w-4 h-px bg-rf-dorado/50 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.25}>
            <a
              href="https://rockandfellers.com.ar/gift-cards" target='blank'
              className="inline-block px-8 py-3 font-display text-sm uppercase tracking-widest bg-rf-dorado text-rf-negro hover:bg-rf-dorado hover:text-rf-negro transition-all duration-200"
            >
              Comprar
            </a>
          </FadeIn>

        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rf-dorado/20 to-transparent"
      />
    </section>
  )
}
