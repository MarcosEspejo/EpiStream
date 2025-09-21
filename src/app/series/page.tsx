import SeriesGrid from '@/components/SeriesGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Series - EpiStream',
  description: 'Descubre las mejores series de televisión populares y mejor valoradas',
}

export default function SeriesPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Series</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Populares</h2>
          <SeriesGrid type="popular" />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Mejor Valoradas</h2>
          <SeriesGrid type="top_rated" />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Al Aire Hoy</h2>
          <SeriesGrid type="airing_today" />
        </section>
      </div>
    </main>
  )
}