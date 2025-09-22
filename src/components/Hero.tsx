'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Datos de películas/series destacadas
  const featuredContent = [
    {
      title: "Películas Épicas",
      subtitle: "Las más grandes historias del cine",
      description: "Descubre obras maestras que han definido generaciones",
      image: "🎬",
      color: "from-purple-600 via-blue-600 to-cyan-500"
    },
    {
      title: "Series Inolvidables", 
      subtitle: "Narrativas que cautivan",
      description: "Sumérgete en mundos que no querrás abandonar",
      image: "📺",
      color: "from-pink-600 via-purple-600 to-indigo-600"
    },
    {
      title: "Contenido Premium",
      subtitle: "Calidad cinematográfica",
      description: "La mejor experiencia de streaming que puedas imaginar",
      image: "⭐",
      color: "from-amber-500 via-orange-600 to-red-600"
    }
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animado */}
      <div className="absolute inset-0">
        {/* Gradiente base animado */}
        <div className={`absolute inset-0 bg-gradient-to-br ${featuredContent[currentSlide].color} opacity-90 transition-all duration-1000`}></div>
        
        {/* Patrón de puntos animados */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
        </div>

        {/* Formas geométricas flotantes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400/10 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/10 rounded-full blur-xl animate-float"></div>

        {/* Overlay de profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-20 container mx-auto px-4 py-20 text-center">
        {/* Logo y título principal */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-glow">
                EpiStream
              </h1>
              {/* Efecto de neón */}
              <div className="absolute inset-0 text-7xl md:text-8xl lg:text-9xl font-black text-white opacity-10 blur-sm animate-pulse">
                EpiStream
              </div>
            </div>
          </div>
          
          {/* Subtítulo dinámico */}
          <div className="h-8 mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/95 animate-slide-in">
              {featuredContent[currentSlide].title}
            </h2>
          </div>
          
          <div className="h-6 mb-6">
            <p className="text-lg md:text-xl text-white/80 animate-slide-in">
              {featuredContent[currentSlide].subtitle}
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            {featuredContent[currentSlide].description}
          </p>
        </div>

        {/* Botones de Acción Mejorados */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Link 
            href="/movies" 
            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span className="text-2xl group-hover:animate-bounce">🎬</span>
              <span>Explorar Películas</span>
            </span>
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>

          <Link 
            href="/series" 
            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-transparent to-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold text-lg rounded-2xl backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span className="text-2xl group-hover:animate-bounce">📺</span>
              <span>Descubrir Series</span>
            </span>
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </div>

        {/* Estadísticas o características */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
          {[
            { icon: '🎭', number: '10K+', label: 'Películas' },
            { icon: '📱', number: '5K+', label: 'Series' },
            { icon: '⭐', number: '100%', label: 'Gratis' }
          ].map((stat, index) => (
            <div key={index} className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-white/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de slide */}
        <div className="flex justify-center space-x-2 mt-12 animate-fade-in" style={{animationDelay: '0.8s'}}>
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Animaciones CSS personalizadas */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(-1deg);
          }
          66% {
            transform: translateY(-25px) rotate(1deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(2deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}