import MovieGrid from '@/components/MovieGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Películas - EpiStream',
  description: 'Explora nuestra colección de películas populares y mejor valoradas',
}

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Películas</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Populares</h2>
          <MovieGrid type="popular" />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Mejor Valoradas</h2>
          <MovieGrid type="top_rated" />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Próximamente</h2>
          <MovieGrid type="upcoming" />
        </section>
      </div>
    </main>
  )
}