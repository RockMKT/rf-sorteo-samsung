import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sorteo Samsung | Rock&Feller\'s',
  description: 'Participá en el sorteo de un Samsung en Rock&Feller\'s. Registrá tu factura y entrá.',
  openGraph: {
    title: 'Sorteo Samsung | Rock&Feller\'s',
    description: 'Registrá tu factura y participá por un Samsung.',
    siteName: 'Rock&Feller\'s',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
