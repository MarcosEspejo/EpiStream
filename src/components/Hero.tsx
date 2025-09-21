export default function Hero() {
  return (
    <section className="relative h-96 hero-bg flex items-center justify-center text-center">
      <div className="container mx-auto px-4 z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          EpiStream
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Descubre las mejores películas y series de todos los tiempos. 
          Tu entretenimiento favorito en un solo lugar.
        </p>
        <div className="space-x-4">
          <a 
            href="/movies" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Ver Películas
          </a>
          <a 
            href="/series" 
            className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Ver Series
          </a>
        </div>
      </div>
      
      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/20"></div>
    </section>
  )
}