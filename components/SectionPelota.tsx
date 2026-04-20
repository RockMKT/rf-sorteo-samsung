'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'

/*
  TODO: definir con el equipo de RF el contenido de esta sección.
  Placeholder: mecánica del sorteo / cómo funciona la selección del ganador.
*/

const MECANICA = [
  {
    step: '01',
    titulo: 'Período de participación',
    texto: 'TODO: indicar fecha de inicio y cierre del período.',
  },
  {
    step: '02',
    titulo: 'Selección del ganador',
    texto: 'El ganador se selecciona de forma aleatoria entre todos los participantes registrados con factura válida.',
  },
  {
    step: '03',
    titulo: 'Comunicación',
    texto: 'Contactamos al ganador por email y teléfono dentro de las 72 horas del sorteo.',
  },
  {
    step: '04',
    titulo: 'Entrega del premio',
    texto: 'TODO: definir lugar y modalidad de entrega con el equipo de RF.',
  },
]

export default function SectionPelota() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(196,171,75,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Texto */}
        <div>
          <FadeIn direction="left">
            <p className="text-[10px] font-display uppercase tracking-[0.35em] text-rf-dorado/60 mb-3">
              Cómo funciona
            </p>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-rf-texto mb-4">
              La mecánica
              <br />
              del sorteo
            </h2>
            <div aria-hidden="true" className="w-16 h-px bg-rf-dorado/40 mb-8" />
          </FadeIn>

          <div className="space-y-6">
            {MECANICA.map(({ step, titulo, texto }, i) => (
              <FadeIn key={step} delay={0.1 * i} direction="left">
                <div className="flex gap-5">
                  <span className="font-display text-rf-dorado/30 text-xs tracking-widest mt-0.5 w-6 flex-shrink-0">
                    {step}
                  </span>
                  <div>
                    <h3 className="font-display text-sm uppercase tracking-wide text-rf-texto mb-1">
                      {titulo}
                    </h3>
                    <p className="text-xs text-rf-texto/45 leading-relaxed">{texto}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Visual */}
        <FadeIn direction="right" className="flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(196,171,75,0.08) 0%, transparent 70%)',
              }}
            />
            {/* Círculo exterior */}
            <div className="absolute inset-0 rounded-full border border-rf-dorado/10" />
            {/* Círculo medio */}
            <div className="absolute inset-8 rounded-full border border-rf-dorado/15" />
            {/* Círculo interior */}
            <div className="absolute inset-16 rounded-full border border-rf-dorado/20 bg-rf-carbon" />

            {/* Centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] font-display uppercase tracking-[0.3em] text-rf-dorado/50 mb-2">
                Premio
              </p>
              <p className="font-display text-2xl uppercase tracking-wide text-rf-texto leading-tight">
                {/* TODO: completar con modelo exacto */}
                Samsung
              </p>
              <div aria-hidden="true" className="mt-2 w-8 h-px bg-rf-dorado/40" />
            </div>

            {/* Líneas decorativas */}
            {[0, 45, 90, 135].map(deg => (
              <div
                key={deg}
                aria-hidden="true"
                className="absolute inset-0"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-rf-dorado/20 to-transparent" />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
