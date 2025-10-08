'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Películas top con datos reales
  const topMovies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      year: "2022",
      genre: "Sci-Fi • Adventure",
      rating: 8.7,
      description: "Jake Sully vive con su nueva familia formada en el planeta de Pandora. Una vez que una amenaza familiar regresa para terminar lo que se empezó anteriormente, Jake debe trabajar con Neytiri y el ejército de la raza Na'vi para proteger su planeta.",
      backdrop: "from-blue-900 via-cyan-800 to-blue-600"
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      year: "2022",
      genre: "Action • Drama",
      rating: 9.1,
      description: "Después de más de treinta años de servicio como uno de los mejores aviadores de la Armada, Pete 'Maverick' Mitchell está donde pertenece, superando los límites como piloto de pruebas valiente.",
      backdrop: "from-amber-900 via-orange-800 to-red-600"
    },
    {
      id: 3,
      title: "Spider-Man: No Way Home",
      year: "2021",
      genre: "Action • Adventure",
      rating: 8.9,
      description: "Peter Parker es desenmascarado y ya no es capaz de separar su vida normal de los enormes riesgos que conlleva ser un súper héroe. Cuando le pide ayuda a Doctor Strange los riesgos pasan a ser aún más peligrosos.",
      backdrop: "from-red-900 via-purple-800 to-blue-600"
    },
    {
      id: 4,
      title: "The Batman",
      year: "2022",
      genre: "Action • Crime",
      rating: 8.5,
      description: "Cuando un asesino se dirige a la élite de Gotham con una serie de maquinaciones sádicas, un rastro de pistas crípticas envía al Detective del Mundo por los bajos fondos para investigar la corrupción.",
      backdrop: "from-gray-900 via-slate-800 to-black"
    },
    {
      id: 5,
      title: "Dune",
      year: "2021",
      genre: "Sci-Fi • Adventure", 
      rating: 8.8,
      description: "Paul Atreides, un joven brillante y talentoso nacido con un gran destino que está más allá de su comprensión, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.",
      backdrop: "from-orange-900 via-amber-800 to-yellow-600"
    }
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topMovies.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [topMovies.length])

  if (!mounted) return null

  const currentMovie = topMovies[currentIndex]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      
      {/* Dynamic Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentMovie.backdrop} opacity-20 transition-opacity duration-1000`}
        key={currentMovie.id}
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:60px_60px] opacity-40"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex items-center">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
          
          {/* Left Side - Movie Info */}
          <div 
            className="space-y-8"
            key={`info-${currentMovie.id}`}
          >
            
            {/* Header */}
            <div>
              <div 
                className="text-6xl md:text-8xl font-light text-white mb-4 tracking-wider"
              >
                <span className="text-white font-thin">
                  Anónimo
                </span>
              </div>
              <p 
                className="text-xl text-gray-400 font-light"
              >
                Contenido cinematográfico de calidad
              </p>
            </div>

            {/* Current Movie Info */}
            <div 
              className="space-y-6"
              key={`details-${currentMovie.id}`}
            >
              
              {/* Movie Title */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {currentMovie.title}
                </h2>
                <div className="flex items-center space-x-4 text-gray-400">
                  <span className="text-lg font-medium">{currentMovie.year}</span>
                  <span>•</span>
                  <span className="text-lg">{currentMovie.genre}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-lg font-medium text-white">{currentMovie.rating}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                {currentMovie.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <Link 
                  href={`/movie/${currentMovie.id}`}
                  className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold text-lg rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg group"
                >
                  <svg 
                    className="mr-3 w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Ver Ahora</span>
                </Link>
                
                <button className="inline-flex items-center px-6 py-4 border-2 border-gray-600 text-white font-medium rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300">
                  <svg 
                    className="mr-2 w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Mi Lista</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Card Slider */}
          <div className="relative h-[600px] perspective-1000">
            
            {/* Movie Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center">
              {topMovies.map((movie, index) => {
                const offset = index - currentIndex
                const absOffset = Math.abs(offset)
                
                return (
                  <div
                    key={movie.id}
                    className={`absolute w-80 h-[480px] cursor-pointer transition-all duration-500 ease-out ${
                      index === currentIndex ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      transform: `translateX(${offset * 120}px) translateY(${absOffset * 20}px) scale(${
                        index === currentIndex ? 1 : 0.85 - (absOffset * 0.1)
                      }) rotateY(${offset * -15}deg)`,
                      opacity: absOffset > 2 ? 0 : 1 - (absOffset * 0.2),
                      zIndex: index === currentIndex ? 20 : 10 - absOffset,
                      transformStyle: "preserve-3d"
                    }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    
                    {/* Movie Card */}
                    <div className={`relative w-full h-full rounded-2xl overflow-hidden ${
                      index === currentIndex 
                        ? 'ring-4 ring-white/50 shadow-2xl shadow-white/20' 
                        : 'ring-2 ring-gray-700 shadow-xl shadow-black/50'
                    }`}>
                      
                      {/* Card Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${movie.backdrop} opacity-80`} />
                      
                      {/* Movie Poster Placeholder */}
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <div className="text-6xl opacity-50">🎬</div>
                      </div>
                      
                      {/* Card Content Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Card Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{movie.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                          <span>{movie.year}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span>{movie.rating}</span>
                          </span>
                        </div>
                      </div>

                      {/* 3D Depth Effect */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-300 ${
                          index === currentIndex ? 'opacity-10' : 'opacity-0'
                        }`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3">
            {topMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-white scale-125' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Side Navigation */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <button
            onClick={() => setCurrentIndex((prev) => prev === 0 ? topMovies.length - 1 : prev - 1)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % topMovies.length)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}