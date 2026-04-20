'use client'

import FadeIn from './FadeIn'

// TODO: completar con direcciones, horarios, teléfonos e Instagram reales
const SUCURSALES = [
  {
    ciudad: 'Buenos Aires',
    direccion1: 'Pilar KM 50 | Complejo Hey Add Center',
    direccion2: 'Unicenter Shopping',
    direccion3: 'Av. Dorrego esq. Libertador | Paseo OLA PALERMO',
    instagram: '@rockandfellersba',
  },
  {
    ciudad: 'Rosario',
    direccion1: 'Bv. Oroño esq. Jujuy',
    direccion2: 'Alto Rosario Shopping',
    direccion3: 'San Lorenzo esq. San Martín | Hotel Esplendor Savoy',
    instagram: '@rockandfellersrosario',
  },
]

export default function SectionSucursales() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rf-dorado/20 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Encabezado */}
        <FadeIn className="mb-12 text-center">
          <p className="text-[10px] font-display uppercase tracking-[0.35em] text-rf-dorado/60 mb-3">
            Dónde encontrarnos
          </p>
          <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-rf-texto">
            Nuestras sucursales
          </h2>
          <div aria-hidden="true" className="mt-4 mx-auto w-16 h-px bg-rf-dorado/40" />
        </FadeIn>

        {/* Cards de sucursales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SUCURSALES.map(({ ciudad, direccion1, direccion2, direccion3, instagram }, i) => (
            <FadeIn key={ciudad} delay={i * 0.15}>
              <article className="bg-rf-carbon border border-rf-dorado/10 p-6 hover:border-rf-dorado/25 transition-colors duration-300">
                <h3 className="font-display text-sm uppercase tracking-widest mb-5">
                  {ciudad}
                </h3>

                <ul className="space-y-4">
                  {/* Dirección */}
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-rf-dorado/50 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-rf-texto/60">{direccion1}</span>
                  </li>

                    {/* Dirección 1*/}
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-rf-dorado/50 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-rf-texto/60">{direccion2}</span>
                  </li>

                    {/* Dirección */}
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-rf-dorado/50 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-rf-texto/60">{direccion3}</span>
                  </li>

                  {/* Instagram */}
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-rf-dorado/50 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <a
                      href={`https://instagram.com/${instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rf-dorado/70 hover:text-rf-dorado transition-colors"
                    >
                      {instagram}
                    </a>
                  </li>
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rf-dorado/20 to-transparent"
      />
    </section>
  )
}
