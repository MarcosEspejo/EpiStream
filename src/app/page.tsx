import Hero from '@/components/Hero'
import MovieGrid from '@/components/MovieGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Hero />
      
      {/* Sección de separación con efecto */}
      <div className="relative -mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
          
          {/* Películas Populares */}
          <section className="mb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                  Películas Populares
                </h2>
                <p className="text-gray-400 text-lg">
                  Los blockbusters que están conquistando el mundo
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
              </div>
            </div>
            <MovieGrid type="popular" limit={60} />
          </section>

          {/* Separador visual */}
          <div className="flex justify-center my-16 animate-fade-in">
            <div className="flex items-center space-x-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white/70 font-medium">Películas Mejor Valoradas</span>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Películas Mejor Valoradas */}
          <section className="mb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-red-200 bg-clip-text text-transparent mb-2">
                  Películas Mejor Valoradas
                </h2>
                <p className="text-gray-400 text-lg">
                  Las obras maestras aclamadas por la crítica
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
            </div>
            <MovieGrid type="top_rated" limit={60} />
          </section>

          {/* Separador visual */}
          <div className="flex justify-center my-16 animate-fade-in">
            <div className="flex items-center space-x-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white/70 font-medium">Próximos Estrenos</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Próximos Estrenos */}
          <section className="mb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent mb-2">
                  Próximos Estrenos
                </h2>
                <p className="text-gray-400 text-lg">
                  Las películas más esperadas que están por llegar
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
            </div>
            <MovieGrid type="upcoming" limit={60} />
          </section>

          {/* Separador visual */}
          <div className="flex justify-center my-16 animate-fade-in">
            <div className="flex items-center space-x-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-white/70 font-medium">Series de Televisión</span>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Series Populares */}
          <section className="mb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-2">
                  Series Populares
                </h2>
                <p className="text-gray-400 text-lg">
                  Historias épicas que no querrás dejar de ver
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📺</span>
                </div>
              </div>
            </div>
            <MovieGrid type="tv" limit={60} />
          </section>

          {/* Sección de características adicionales */}
          <section className="py-16 animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Por qué elegir EpiStream?
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                La mejor experiencia de streaming que puedas imaginar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '⚡',
                  title: 'Velocidad Extrema',
                  description: 'Carga instantánea sin buffering'
                },
                {
                  icon: '📱',
                  title: 'Multi-Dispositivo',
                  description: 'Ve desde cualquier pantalla'
                },
                {
                  icon: '🆓',
                  title: '100% Gratis',
                  description: 'Sin costos ocultos ni suscripciones'
                },
                {
                  icon: '🌟',
                  title: 'Calidad Premium',
                  description: 'La mejor resolución disponible'
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Final */}
          <section className="text-center py-16 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-glow">
                Comienza tu aventura cinematográfica
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Miles de películas y series te esperan. Sin límites, sin restricciones, solo entretenimiento puro.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <span className="relative z-10">🎬 Explorar Ahora</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                <div className="flex items-center space-x-2 text-gray-400">
                  <span>⭐</span>
                  <span>Más de 1M de usuarios satisfechos</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}