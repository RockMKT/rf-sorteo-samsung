'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Promo {
  image: string
  title: string
  buttonLabel?: string
  buttonHref?: string
}

const PROMOS: Promo[] = [
  {
    image: '/black.png',
    title: 'NUEVAS GIFT EXPERIENCE',
    buttonLabel: 'Comprá una',
    buttonHref: 'https://rockandfellers.com.ar/gift-cards/experience',
  },
  {
    image: '/televisor98.png',
    title: 'VASOS MUNDIALES',
  },
]

const SLIDE_INTERVAL = 4000

interface Props {
  nombre: string
  email: string
  onClose: () => void
}

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
}

export default function ModalConfirmacion({ nombre, email, onClose }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (PROMOS.length <= 1) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % PROMOS.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const goNext = () => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % PROMOS.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + PROMOS.length) % PROMOS.length)
  }

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const promo = PROMOS[current]

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
        {/* Icono check */}
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

        {/* Carrusel */}
        <div className="mb-6">
          {/* Imagen */}
          <div className="relative overflow-hidden rounded-xl h-44 bg-rf-negro/40">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                src={promo.image}
                alt={promo.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Flechas */}
            {PROMOS.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Promoción anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Promoción siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Título y botón */}
          <p className="font-display text-sm uppercase tracking-wider text-rf-dorado mt-3 min-h-[1.25rem]">
            {promo.title}
          </p>
          {promo.buttonLabel && (
            <a
              href={promo.buttonHref}
              onClick={onClose}
              className="inline-block mt-2 px-5 py-1.5 text-[11px] font-display uppercase tracking-wider border border-rf-dorado/40 text-rf-dorado hover:bg-rf-dorado/10 transition-colors"
            >
              {promo.buttonLabel}
            </a>
          )}

          {/* Dots */}
          {PROMOS.length > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-3" role="tablist" aria-label="Slides de promociones">
              {PROMOS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Promoción ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={[
                    'h-1.5 rounded-full transition-all duration-300',
                    i === current ? 'w-4 bg-rf-dorado' : 'w-1.5 bg-rf-dorado/30 hover:bg-rf-dorado/60',
                  ].join(' ')}
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl font-display uppercase tracking-widest text-sm bg-gradient-dorado text-rf-negro hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
