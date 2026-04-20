'use client'

import Image from 'next/image'

interface Props {
  onTerminosClick: () => void
}

export default function Footer({ onTerminosClick }: Props) {
  return (
    <footer className="border-t border-rf-dorado/15" style={{ backgroundColor: '#050505' }}>
      {/* Fila superior: logo + redes */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-7 flex flex-col sm:flex-row items-center justify-between gap-5 border-b border-rf-dorado/10">
        <Image
          src="/logogloria.png"
          alt="Rock&Feller's"
          width={160}
          height={60}
          className="object-contain object-left"
        />
      </div>

      {/* Fila media — 3 columnas */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sobre RF */}
        <div>
          <h3 className="text-[10px] font-display uppercase tracking-widest text-rf-dorado/70 mb-3">
            Sobre Rock&amp;Feller's
          </h3>
          <p className="text-rf-texto/45 text-sm leading-relaxed">
            Rock&amp;Feller's es el lugar donde el rock americano y la buena mesa se
            encuentran. Sucursales en Buenos Aires y Rosario.{' '}
          </p>
        </div>

          {/* Reservas */}
        <div>
          <h3 className="text-[10px] font-display uppercase tracking-widest text-rf-dorado/70 mb-3">
            Reservas
          </h3>
          <p className="text-rf-texto/45 text-sm leading-relaxed">
            Reservá en Rock&Feller's
          </p>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-[10px] font-display uppercase tracking-widest text-rf-dorado/70 mb-3">
            Legal
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={onTerminosClick}
                className="text-rf-texto/45 hover:text-rf-dorado transition-colors text-left"
              >
                Términos del Sorteo
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Fila inferior */}
      <div className="border-t border-rf-dorado/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-center">
          <p className="text-rf-texto/25 text-xs">
            &copy; 2026 Rock&amp;Feller's. Todos los derechos reservados.
          </p>
          <p className="text-rf-texto/25 text-xs">
            Sorteo sujeto a Términos y Condiciones.
          </p>
        </div>
      </div>
    </footer>
  )
}
