import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EpiStream - Películas y Series',
  description: 'Descubre las mejores películas y series en streaming. Tu entretenimiento favorito en un solo lugar.',
  keywords: ['películas', 'series', 'streaming', 'entretenimiento', 'cine', 'tv'],
  authors: [{ name: 'EpiStream Team' }],
  creator: 'EpiStream',
  publisher: 'EpiStream',
  metadataBase: new URL('https://epistream.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://epistream.vercel.app',
    title: 'EpiStream - Películas y Series',
    description: 'Descubre las mejores películas y series en streaming',
    siteName: 'EpiStream',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EpiStream - Películas y Series',
    description: 'Descubre las mejores películas y series en streaming',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}