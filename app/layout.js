import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Bryan — Portafolio',
  description: 'Art Direction · Brand Strategy · Content · Performance',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Bryan — Portafolio',
    description: 'Art Direction · Brand Strategy · Content · Performance',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}<SpeedInsights /></body>
    </html>
  )
}
