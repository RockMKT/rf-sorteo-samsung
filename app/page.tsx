'use client'

import { useState } from 'react'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import SectionCombos from '@/components/SectionCombos'
import SectionPelota from '@/components/SectionPelota'
import SectionGiftCard from '@/components/SectionGiftCard'
import SectionSucursales from '@/components/SectionSucursales'
import Footer from '@/components/Footer'
import ModalConfirmacion from '@/components/ModalConfirmacion'
import ModalTerminos from '@/components/ModalTerminos'

export default function Home() {
  const [modalConfirmacionOpen, setModalConfirmacionOpen] = useState(false)
  const [modalTerminosOpen, setModalTerminosOpen] = useState(false)
  const [confirmData, setConfirmData] = useState<{ nombre: string; email: string }>({
    nombre: '',
    email: '',
  })

  const handleFormSuccess = (data: { nombre: string; email: string }) => {
    setConfirmData(data)
    setModalConfirmacionOpen(true)
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 inset-x-0 z-40 border-b border-rf-dorado/10 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(5,5,5,0.85)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-center">
          <a href="/" aria-label="Rock&Feller's — Inicio">
            <Image
              src="/rflogo.png"
              alt="Rock&Feller's"
              width={110}
              height={40}
              className="object-contain"
              priority
            />
          </a>
        </div>
      </nav>

      <main>
        <HeroSection
          onFormSuccess={handleFormSuccess}
          onTerminosClick={() => setModalTerminosOpen(true)}
        />

        <SectionCombos />

        {/* <SectionPelota /> */}

        <SectionGiftCard />

        <SectionSucursales />

        <Footer onTerminosClick={() => setModalTerminosOpen(true)} />
      </main>

      {modalConfirmacionOpen && (
        <ModalConfirmacion
          nombre={confirmData.nombre}
          email={confirmData.email}
          onClose={() => setModalConfirmacionOpen(false)}
        />
      )}

      {modalTerminosOpen && (
        <ModalTerminos onClose={() => setModalTerminosOpen(false)} />
      )}
    </>
  )
}
