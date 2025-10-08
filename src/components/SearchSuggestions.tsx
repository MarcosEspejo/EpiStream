'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import tmdbService, { TMDBMultiSearchResult } from '@/services/tmdb'

interface SearchSuggestionsProps {
  results: TMDBMultiSearchResult[]
  loading: boolean
  onSelect: (item: TMDBMultiSearchResult) => void
  onClose: () => void
  query: string
}

export default function SearchSuggestions({
  results,
  loading,
  onSelect,
  onClose,
  query
}: SearchSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const suggestionRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Helper functions
  const getTitle = (item: TMDBMultiSearchResult): string => {
    return item.title || item.name || 'Sin título'
  }

  const getDate = (item: TMDBMultiSearchResult): string => {
    const date = item.release_date || item.first_air_date
    return date ? new Date(date).getFullYear().toString() : 'TBA'
  }

  const getSlug = (item: TMDBMultiSearchResult): string => {
    const title = getTitle(item)
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  }

  // Manejar navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!results.length) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleSelect(results[selectedIndex])
          } else if (query.trim()) {
            // Si no hay selección, ir a página de búsqueda
            router.push(`/search?q=${encodeURIComponent(query)}`)
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [results, selectedIndex, query, router, onClose])

  // Scroll al elemento seleccionado
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [selectedIndex])

  const handleSelect = (item: TMDBMultiSearchResult) => {
    onSelect(item)
  }

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index)
  }

  if (!query.trim()) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto shadow-2xl">
      {loading && (
        <div className="p-4 text-center border-b border-gray-700">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-white rounded-full"></div>
            <span className="text-gray-400 text-sm">Buscando...</span>
          </div>
        </div>
      )}

      {!loading && results.length === 0 && query.trim() && (
        <div className="p-4 text-center">
          <div className="text-gray-400 text-sm mb-2">No se encontraron resultados</div>
          <button
            onClick={() => {
              router.push(`/search?q=${encodeURIComponent(query)}`)
              onClose()
            }}
            className="text-white hover:text-gray-300 text-sm underline transition-colors"
          >
            Buscar "{query}" en toda la base de datos
          </button>
        </div>
      )}

      {results.map((item, index) => (
        <button
          key={`${item.media_type}-${item.id}`}
          ref={el => { suggestionRefs.current[index] = el }}
          className={`w-full p-3 flex items-center gap-3 transition-colors text-left ${
            selectedIndex === index 
              ? 'bg-white/20' 
              : 'hover:bg-white/10'
          }`}
          onClick={() => handleSelect(item)}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {/* Poster thumbnail */}
          <div className="w-10 h-14 bg-gray-800 rounded overflow-hidden flex-shrink-0">
            {item.poster_path ? (
              <Image
                src={tmdbService.getImageURL(item.poster_path)}
                alt={getTitle(item)}
                width={40}
                height={56}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                <span className="text-lg opacity-30">
                  {item.media_type === 'tv' ? '📺' : '🎬'}
                </span>
              </div>
            )}
          </div>

          {/* Content info */}
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">
              {getTitle(item)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                item.media_type === 'tv' 
                  ? 'bg-gray-800 text-gray-300 border-gray-600' 
                  : 'bg-gray-800 text-gray-300 border-gray-600'
              }`}>
                {item.media_type === 'tv' ? 'Serie' : 'Película'}
              </span>
              <span className="text-gray-400 text-xs">{getDate(item)}</span>
              {item.vote_average && item.vote_average > 0 && (
                <span className="text-gray-400 text-xs">
                  ★ {item.vote_average.toFixed(1)}
                </span>
              )}
            </div>
          </div>

          {/* Arrow indicator */}
          {selectedIndex === index && (
            <div className="flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </button>
      ))}

      {results.length > 0 && (
        <div className="border-t border-gray-700 p-3 bg-gray-900/50">
          <button
            onClick={() => {
              router.push(`/search?q=${encodeURIComponent(query)}`)
              onClose()
            }}
            className="w-full text-center text-gray-400 hover:text-white text-sm transition-colors"
          >
            Ver todos los resultados para "{query}"
          </button>
        </div>
      )}
    </div>
  )
}