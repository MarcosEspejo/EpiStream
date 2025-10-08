'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import SearchSuggestions from './SearchSuggestions'
import { useRealTimeSearch } from '@/hooks/useRealTimeSearch'
import type { TMDBMultiSearchResult } from '@/services/tmdb'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchAnimating, setSearchAnimating] = useState(false)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  
  // Hook de búsqueda en tiempo real
  const { query, setQuery, results, loading, clearResults } = useRealTimeSearch(300)

  // Efecto de scroll para el navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Manejar selección de sugerencia
  const handleSuggestionSelect = (item: TMDBMultiSearchResult) => {
    const getSlug = (item: TMDBMultiSearchResult): string => {
      const title = item.title || item.name || ''
      return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    }
    
    router.push(`/${item.media_type === 'tv' ? 'series' : 'movies'}/${item.id}-${getSlug(item)}`)
    setSearchExpanded(false)
    setShowSuggestions(false)
    clearResults()
  }

  // Manejar búsqueda con animación
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchAnimating(true)
      
      // Animación de desvanecimiento
      setTimeout(() => {
        router.push(`/search?q=${encodeURIComponent(query)}`)
        setSearchExpanded(false)
        clearResults()
        setShowSuggestions(false)
        setSearchAnimating(false)
      }, 300)
    }
  }

  // Mostrar sugerencias cuando hay resultados y query
  useEffect(() => {
    setShowSuggestions(searchExpanded && (results.length > 0 || loading) && query.trim().length > 0)
  }, [searchExpanded, results, loading, query])

  // Colapsar búsqueda cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (searchExpanded && !query) {
          setSearchExpanded(false)
        }
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [searchExpanded, query])

  // Verificar si el enlace está activo
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-lg shadow-2xl border-b border-white/10' 
        : 'bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 relative">
          
          {/* Logo Anónimo - Versión mejorada */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              {/* Icono principal con gradiente sutil */}
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black border-2 border-white rounded-lg flex items-center justify-center transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-300 shadow-lg group-hover:shadow-white/25">
                <span className="text-xl font-black text-white group-hover:text-gray-200">A</span>
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
              {/* Glow effect discreto */}
              <div className="absolute inset-0 w-12 h-12 bg-white/20 rounded-lg blur opacity-0 group-hover:opacity-40 transition-all duration-300 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                Anónimo
              </h1>
              <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 -mt-1 tracking-wider">
                STREAMING
              </p>
            </div>
          </Link>

          {/* Navegación centrada - Diseño original */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/movies', label: 'Películas' },
              { href: '/series', label: 'Series' },
              { href: '/live-tv', label: 'TV en Vivo' },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`text-white hover:text-gray-300 transition-colors duration-300 px-3 py-1 ${
                  isActive(item.href) ? 'border-b-2 border-white' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contenedor búsqueda con tiempo real - Lado derecho */}
          <div 
            ref={searchRef}
            className="relative group"
            onMouseEnter={() => setSearchExpanded(true)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Búsqueda expandida */}
            <div className={`flex items-center transition-all duration-500 ease-out ${
              searchExpanded 
                ? 'w-80 opacity-100' 
                : 'w-12 opacity-100'
            }`}>
              {/* Ícono de búsqueda / Input expandible */}
              {!searchExpanded ? (
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 cursor-pointer">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              ) : (
                <form onSubmit={handleSearch} className="flex items-center w-full">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                        setShowSuggestions(true)
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Buscar películas, series..."
                      className={`w-full pl-12 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white backdrop-blur-sm transition-all duration-300 ${
                        searchAnimating ? 'opacity-50' : 'opacity-100'
                      }`}
                      autoFocus
                    />
                    
                    {/* Ícono de búsqueda dentro del input */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                        searchAnimating ? 'animate-pulse' : ''
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    
                    {/* Botón de cerrar */}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchExpanded(false)
                        clearResults()
                        setShowSuggestions(false)
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
              
              {/* Dropdown de sugerencias */}
              {showSuggestions && (
                <SearchSuggestions
                  results={results}
                  loading={loading}
                  onSelect={handleSuggestionSelect}
                  onClose={() => setShowSuggestions(false)}
                  query={query}
                />
              )}
            </div>
            
            {/* Indicador sutil cuando está expandido */}
            {searchExpanded && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2 bg-black/50 backdrop-blur-lg rounded-2xl mx-4 mb-4 border border-gray-800">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/movies', label: 'Películas' },
              { href: '/series', label: 'Series' },
              { href: '/live-tv', label: 'TV en Vivo' },
              { href: '/search', label: 'Buscar' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar