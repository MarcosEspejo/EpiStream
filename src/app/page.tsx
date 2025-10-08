import Hero from '@/components/Hero'
import MovieGrid from '@/components/MovieGrid'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Hero />
      
      {/* Separador con gradiente */}
      <div className="relative -mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
          
          {/* Películas Populares */}
          <section className="mb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  En Tendencia
                </h2>
                <p className="text-gray-400 text-lg">
                  Lo que el mundo está viendo ahora
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-1 h-12 bg-white rounded-full"></div>
              </div>
            </div>
            <MovieGrid type="popular" limit={18} />
          </section>

          {/* Separador visual */}
          <div className="flex justify-center my-16 animate-fade-in">
            <div className="flex items-center space-x-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
              <span className="text-white/70 font-medium">Contenido Destacado</span>
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Películas Mejor Valoradas */}
          <section className="mb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Aclamadas por la Crítica
                </h2>
                <p className="text-gray-400 text-lg">
                  Las obras maestras del cine contemporáneo
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-1 h-12 bg-white rounded-full"></div>
              </div>
            </div>
            <MovieGrid type="top_rated" limit={18} />
          </section>

          {/* Separador visual */}
          <div className="flex justify-center my-16 animate-fade-in">
            <div className="flex items-center space-x-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
              <span className="text-white/70 font-medium">Próximos Estrenos</span>
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Próximamente */}
          <section className="mb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Próximos Estrenos
                </h2>
                <p className="text-gray-400 text-lg">
                  Las películas más esperadas que llegan pronto
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-1 h-12 bg-white rounded-full"></div>
              </div>
            </div>
            <MovieGrid type="upcoming" limit={18} />
          </section>
        </div>
      </div>
    </main>
  )
}