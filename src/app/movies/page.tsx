import MovieGrid from '@/components/MovieGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Películas - Anónimo',
  description: 'Explora nuestra cuidada selección de películas populares y mejor valoradas',
}

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section - Diseño Anónimo */}
      <div className="relative bg-gradient-to-b from-black via-gray-900/20 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium tracking-wider">CATÁLOGO CINEMATOGRÁFICO</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                Películas
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Explora nuestra cuidada selección de películas. Desde los éxitos más recientes hasta los clásicos atemporales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Sección En Tendencia - Estilo Anónimo */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-12 bg-white rounded-full"></div>
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  En Tendencia
                </h2>
                <p className="text-gray-500 text-sm mt-1">Las más populares del momento</p>
              </div>
            </div>
            <div className="bg-black border border-white/20 px-6 py-2 rounded-full text-white font-medium hover:bg-white/5 transition-all duration-300">
              Top 100
            </div>
          </div>
          <MovieGrid type="popular" limit={100} />
        </section>
        
        {/* Sección Mejor Valoradas - Estilo Anónimo */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-12 bg-white rounded-full"></div>
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  Mejor Valoradas
                </h2>
                <p className="text-gray-500 text-sm mt-1">Aclamadas por la crítica</p>
              </div>
            </div>
            <div className="bg-black border border-white/20 px-6 py-2 rounded-full text-white font-medium hover:bg-white/5 transition-all duration-300">
              Top 100
            </div>
          </div>
          <MovieGrid type="top_rated" limit={100} />
        </section>
        
        {/* Sección Próximos Estrenos - Estilo Anónimo */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-12 bg-white rounded-full"></div>
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  Próximos Estrenos
                </h2>
                <p className="text-gray-500 text-sm mt-1">Lo que viene en 2024-2025</p>
              </div>
            </div>
            <div className="bg-black border border-white/20 px-6 py-2 rounded-full text-white font-medium hover:bg-white/5 transition-all duration-300">
              Próximamente
            </div>
          </div>
          <MovieGrid type="upcoming" limit={80} />
        </section>

        {/* Estadísticas del Catálogo - Diseño Anónimo Refinado */}
        <div className="relative mb-12">
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                Estadísticas del Catálogo
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Acceso completo a la base de datos cinematográfica más extensa del mundo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="bg-black/20 border border-white/10 rounded-xl p-6 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-4xl font-black text-white mb-2 tracking-tight">280+</div>
                  <div className="text-gray-300 font-medium">En Tendencia</div>
                  <div className="text-xs text-gray-500 mt-1">Populares ahora</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-black/20 border border-white/10 rounded-xl p-6 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-4xl font-black text-white mb-2 tracking-tight">280+</div>
                  <div className="text-gray-300 font-medium">Mejor Valoradas</div>
                  <div className="text-xs text-gray-500 mt-1">Aclamadas por crítica</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-black/20 border border-white/10 rounded-xl p-6 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-4xl font-black text-white mb-2 tracking-tight">160+</div>
                  <div className="text-gray-300 font-medium">Próximos Estrenos</div>
                  <div className="text-xs text-gray-500 mt-1">Próximamente</div>
                </div>
              </div>
            </div>
            
            {/* Línea decorativa */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-8"></div>
            
            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">
                Catálogo completo de <span className="text-white font-medium">TMDB</span> — Miles de opciones para explorar
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}