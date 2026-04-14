import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Woods — Creative Strategist',
  description: 'Art Direction · Brand Strategy · Content · Performance',
  openGraph: {
    title: 'Woods — Creative Strategist',
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
