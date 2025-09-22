import MovieGrid from '@/components/MovieGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Series - EpiStream',
  description: 'Descubre las mejores series de televisión populares y mejor valoradas',
}

export default function SeriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4">
            📺 Todas las Series
          </h1>
          <p className="text-xl text-gray-300">
            Miles de series de TMDB - Desde clásicos hasta los últimos estrenos
          </p>
        </div>
        
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              🔥 Series Populares
            </h2>
            <div className="bg-pink-600 px-4 py-2 rounded-full text-white font-semibold">
              Top 100
            </div>
          </div>
          <MovieGrid type="tv" limit={100} />
        </section>

        {/* Mensaje informativo */}
        <div className="text-center py-12 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-2xl border border-pink-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            📊 Estadísticas de Series
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">200+</div>
              <div className="text-gray-300">Series Populares</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">TMDB</div>
              <div className="text-gray-300">Base de Datos Oficial</div>
            </div>
          </div>
          <p className="text-gray-400 mt-6">
            🌍 Series de todo el mundo - Drama, Comedia, Acción, Ciencia Ficción y más
          </p>
        </div>
      </div>
    </main>
  )
}