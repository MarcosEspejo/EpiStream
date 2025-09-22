'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Efecto de scroll para el navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Manejar búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  // Verificar si el enlace está activo
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-lg shadow-2xl border-b border-purple-500/20' 
          : 'bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Mejorado con Animaciones */}
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                {/* Icono del logo con animación */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/25">
                  <span className="text-2xl font-black text-white">E</span>
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                  EpiStream
                </h1>
                <p className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300 -mt-1">
                  Tu cine
                </p>
              </div>
            </Link>

            {/* Desktop Menu con efectos hover mejorados */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { href: '/', label: 'Inicio', icon: '🏠' },
                { href: '/movies', label: 'Películas', icon: '🎬' },
                { href: '/series', label: 'Series', icon: '📺' },
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`relative px-6 py-3 rounded-full group transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2 font-medium">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  {!isActive(item.href) && (
                    <>
                      {/* Efecto hover background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-blue-600/0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      {/* Border glow */}
                      <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/30 rounded-full transition-all duration-300"></div>
                    </>
                  )}
                </Link>
              ))}

              {/* Botón de búsqueda animado */}
              <button
                onClick={() => setSearchOpen(true)}
                className="relative ml-4 p-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse"></div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Mobile search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-300 hover:text-white focus:outline-none"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                  <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu mejorado */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 pt-4 pb-6 space-y-2 bg-black/50 backdrop-blur-lg rounded-2xl mx-4 mb-4 border border-gray-800">
              {[
                { href: '/', label: 'Inicio', icon: '🏠' },
                { href: '/movies', label: 'Películas', icon: '🎬' },
                { href: '/series', label: 'Series', icon: '📺' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal con animación */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSearchOpen(false)}
          ></div>
          
          {/* Search Container */}
          <div className="relative w-full max-w-2xl mx-4 animate-slide-down">
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">Buscar Contenido</h3>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="p-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar películas, series, actores..."
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                
                {/* Search Tips */}
                <div className="mt-4 text-sm text-gray-400">
                  <p>💡 Tips: Prueba buscar "Avengers", "Breaking Bad" o tu actor favorito</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { 
            opacity: 0;
            transform: translateY(-50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
    </>
  )
}