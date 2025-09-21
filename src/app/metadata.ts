export const metadata = {
  title: 'EpiStream - Películas y Series',
  description: 'Descubre las mejores películas y series en streaming',
  keywords: ['películas', 'series', 'streaming', 'entretenimiento'],
  authors: [{ name: 'EpiStream Team' }],
  creator: 'EpiStream',
  publisher: 'EpiStream',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
}