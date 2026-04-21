'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'

// TODO: reemplazar con los combos reales + precios
const COMBOS = [
  {
    img: '/vaso1.png',
    nombre: 'Combo Clásico',
    descripcion: 'TODO: descripción del combo clásico.',
    precio: '$ TODO',
  },
  {
    img: '/vaso 2.png',
    nombre: 'Combo Premium',
    descripcion: 'TODO: descripción del combo premium.',
    precio: '$ TODO',
  },
]

export default function SectionCombos() {
  return (
    <section className="py-20 md:py-28 bg-rf-negro relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rf-dorado/20 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Encabezado */}
        <FadeIn className="mb-12 text-center">
          <p className="text-[10px] font-display uppercase tracking-[0.35em] text-rf-dorado/60 mb-3">
            disfrutá el mundial al estilo R&F
          </p>
          <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-rf-texto">
            VASOS MUNDIALES
          </h2>
          <div aria-hidden="true" className="mt-4 mx-auto w-16 h-px bg-rf-dorado/40" />
        </FadeIn>

        {/* Grid de combos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {COMBOS.map(({ img, nombre, descripcion, precio }, i) => (
            <FadeIn key={nombre} delay={i * 0.1}>
              <article className="group overflow-hidden duration-300">
                {/* Imagen */}
                <div className="relative aspect-[2/4] overflow-hidden">
                  <Image
                    src={img}
                    alt={nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-rf-carbon via-transparent to-transparent" /> */}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        
                  <FadeIn delay={0.15}>
                    <p className="text-rf-texto/50 text-center mt-6 text-sm leading-relaxed mb-8">
                      Consumiendo un MENÚ KIDS te llevas un vaso de regalo
                    </p>
                  </FadeIn>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rf-dorado/20 to-transparent"
      />
    </section>
  )
}
