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
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(250,185,21,0.05) 0%, transparent 70%)',
        }}
      />

      {/* ── CONTENIDO HERO (centrado) ── */}
      <div className="relative w-full max-w-4xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-10 flex flex-col items-center text-center">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-6 w-full"
        >
          <h1 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-rf-texto leading-tight">
            MIRÁ EL MUNDIAL EN 98&ldquo;
          </h1>
          <div aria-hidden="true" className="mt-4 mx-auto w-16 h-px bg-rf-dorado/50" />
        </motion.div>

        {/* Imagen del televisor — centrada con sombra gris */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl mx-auto mb-8"
        >
          {/* Sombra gris difuminada detrás del televisor */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 bottom-0 h-3/4 blur-3xl rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 80%, rgba(247, 246, 246, 0.3) 0%, rgba(171, 167, 167, 0.1) 50%, transparent 75%)',
            }}
          />

          {/* TV */}
          <div className="relative aspect-video w-full">
            <Image
              src="/televisor98.png"
              alt="Premio: televisor Samsung 98 pulgadas"
              fill
              priority
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="text-rf-texto/60 text-base md:text-lg max-w-lg leading-relaxed"
        >
          Cargá tu factura y participá por un Smart Tv Samsung 98" para disfrutar
          el mundial en tu casa. Cada factura de Rock&amp;Feller&apos;s es una oportunidad.
        </motion.p>
      </div>

      {/* Línea divisoria */}
      <div aria-hidden="true" className="divider-dorado opacity-30 mx-6 md:mx-10" />

      {/* ── FORMULARIO ── */}
      <div id="participar" className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16" style={{ backgroundColor: '#0A0A0A' }}>
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
