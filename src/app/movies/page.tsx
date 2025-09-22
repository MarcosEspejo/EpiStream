import MovieGrid from '@/components/MovieGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Películas - EpiStream',
  description: 'Explora nuestra colección de películas populares y mejor valoradas',
}

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            🎬 Todas las Películas
          </h1>
          <p className="text-xl text-gray-300">
            Miles de películas de TMDB - Sin restricciones, todo el contenido disponible
          </p>
        </div>
        
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🔥 Películas Populares
            </h2>
            <div className="bg-purple-600 px-4 py-2 rounded-full text-white font-semibold">
              Top 100
            </div>
          </div>
          <MovieGrid type="popular" limit={100} />
        </section>
        
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
              🏆 Mejor Valoradas
            </h2>
            <div className="bg-yellow-600 px-4 py-2 rounded-full text-white font-semibold">
              Top 100
            </div>
          </div>
          <MovieGrid type="top_rated" limit={100} />
        </section>
        
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🚀 Próximamente
            </h2>
            <div className="bg-green-600 px-4 py-2 rounded-full text-white font-semibold">
              Estrenos 2024-2025
            </div>
          </div>
          <MovieGrid type="upcoming" limit={80} />
        </section>

        {/* Mensaje informativo */}
        <div className="text-center py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            📊 Estadísticas de Contenido
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">280+</div>
              <div className="text-gray-300">Películas Populares</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">280+</div>
              <div className="text-gray-300">Mejor Valoradas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">160+</div>
              <div className="text-gray-300">Próximos Estrenos</div>
            </div>
          </div>
          <p className="text-gray-400 mt-6">
            🌍 Todo el catálogo de TMDB disponible - Miles de opciones para explorar
          </p>
        </div>
      </div>
    </main>
  )
}