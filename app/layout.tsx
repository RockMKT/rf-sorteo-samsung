import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rock&Feller\'s | Sorteo Smart TV',
  description: 'Participá en el sorteo por un Smart TV 98" en Rock&Feller\'s. Registrá tu factura y entrá.',
  openGraph: {
    title: 'Rock&Feller\'s | Sorteo Smart TV',
    description: 'Registrá tu código de cupón y participá.',
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
