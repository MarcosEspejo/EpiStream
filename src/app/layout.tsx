import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anónimo',
  description: 'Plataforma de contenido cinematográfico de calidad.',
  keywords: ['películas', 'series', 'streaming', 'entretenimiento', 'cine'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}