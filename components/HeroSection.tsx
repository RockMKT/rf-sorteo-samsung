'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FormSorteo from './FormSorteo'

interface Props {
  onFormSuccess: (data: { nombre: string; email: string }) => void
  onTerminosClick: () => void
}

export default function HeroSection({ onFormSuccess, onTerminosClick }: Props) {
  return (
    <section className="relative min-h-screen flex flex-col pt-16 overflow-hidden">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(196,171,75,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-rf-dorado/20 to-transparent"
      />

      {/* ── SPLIT: texto | imagen ── */}
      <div className="relative flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 md:py-20">
        {/* Columna izquierda — logo + texto */}
        <div className="flex flex-col items-start">
          {/* Chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-block text-center text-[10px] font-display uppercase tracking-[0.3em] text-rf-dorado border border-rf-dorado/30 px-4 py-1.5 mb-8">
              GANÁ UN TELEVISOR SAMSUNG 50° PULGADAS HD
            </span>
          </motion.div>

          {/* Logo en lugar del H1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mb-6"
          >
            <Image
              src="/televisor.png"
              alt="Rock&Feller's"
              width={320}
              height={120}
              priority
              className="object-contain object-left max-w-[280px] md:max-w-[320px]"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-rf-texto/60 text-center text-base md:text-lg max-w-md mb-10 leading-relaxed"
          >
            Carga tu factura y participá por un televisor Samsung 55° para ver el mundial en tu casa. Cada factura de Rock&Feller's es una oportunidad.
          </motion.p>
        </div>
      </div>

      {/* Línea divisoria dorada */}
      <div aria-hidden="true" className="divider-dorado opacity-30 mx-6 md:mx-10" />

      {/* ── FORMULARIO ── */}
      <div id="participar" className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-7 text-center">
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-rf-texto mb-4">
                Registrá tu participación
              </h2>
              <p className="text-xs text-rf-texto/40">
                Completá el formulario con los datos de tu factura. Una participación por factura.
              </p>
            </div>

            <div className="bg-rf-carbon border border-rf-dorado/15 p-6 md:p-8 shadow-2xl shadow-black/60">
              <FormSorteo onSuccess={onFormSuccess} onTerminosClick={onTerminosClick} />
            </div>

            <p className="text-center text-rf-texto/25 text-[11px] mt-5 leading-relaxed">
              Solo mayores de 18 años. Válido en todo el territorio argentino.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
