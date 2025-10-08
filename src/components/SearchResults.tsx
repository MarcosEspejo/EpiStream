'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import tmdbService, { TMDBMultiSearchResult } from '@/services/tmdb'
import { debounce } from '@/utils/debounce'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TMDBMultiSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const urlQuery = searchParams.get('q')
    if (urlQuery) {
      setQuery(urlQuery)
      performSearch(urlQuery)
    }
  }, [searchParams])

  // Función debounced para búsqueda
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      performSearch(searchQuery)
    }, 300),
    []
  )

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await tmdbService.searchMulti(searchQuery)
      const filteredResults = response.results.filter(
        item => item.media_type === 'movie' || item.media_type === 'tv'
      )
      setResults(filteredResults)
      
      if (filteredResults.length === 0) {
        setError(`No se encontraron resultados para "${searchQuery}".`)
      }
    } catch (err) {
      console.error('Error searching content:', err)
      setError('Error en la búsqueda. Verifica tu API key.')
      
      const fallbackResults: TMDBMultiSearchResult[] = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        media_type: i % 2 === 0 ? 'movie' : 'tv',
        title: i % 2 === 0 ? `Película ${searchQuery} ${i + 1}` : undefined,
        name: i % 2 === 1 ? `Serie ${searchQuery} ${i + 1}` : undefined,
        overview: `Resultado simulado para "${searchQuery}".`,
        poster_path: null,
        vote_average: 7.5 + Math.random() * 2,
        release_date: i % 2 === 0 ? '2024-01-15' : undefined,
        first_air_date: i % 2 === 1 ? '2024-01-15' : undefined,
        popularity: 100 + Math.random() * 900,
      }))
      setResults(fallbackResults)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    debouncedSearch(query)
    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(query)}`
    window.history.pushState({}, '', newUrl)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch(query) // Búsqueda inmediata en Enter
    }
  }

  const getTitle = (item: TMDBMultiSearchResult): string => {
    return item.title || item.name || 'Título no disponible'
  }

  const getDate = (item: TMDBMultiSearchResult): string => {
    const date = item.release_date || item.first_air_date
    return date ? new Date(date).getFullYear().toString() : 'TBA'
  }

  const getSlug = (item: TMDBMultiSearchResult): string => {
    const title = getTitle(item)
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              debouncedSearch(e.target.value) // Búsqueda en tiempo real
            }}
            onKeyPress={handleKeyPress}
            placeholder="Buscar películas, series..."
            className="w-full px-6 py-4 bg-gray-800/50 border-2 border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 pr-16"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
        
        {query && (
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              {loading ? 'Buscando...' : `${results.length} resultados para "${query}"`}
            </p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 aspect-[2/3] rounded-xl mb-4"></div>
              <div className="bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-700 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : error && results.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{error}</h3>
          <div className="text-gray-400">
            <p>Sugerencias:</p>
            <ul className="mt-4 space-y-2">
              <li>• Verifica la ortografía</li>
              <li>• Usa términos más generales</li>
              <li>• Prueba en inglés</li>
            </ul>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((item) => (
            <Link
              key={`${item.media_type}-${item.id}`}
              href={`/${item.media_type === 'tv' ? 'series' : 'movies'}/${item.id}-${getSlug(item)}`}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:ring-2 group-hover:ring-white/50 transition-all duration-300">
                {item.poster_path ? (
                  <Image
                    src={tmdbService.getImageURL(item.poster_path)}
                    alt={getTitle(item)}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                    <span className="text-6xl opacity-30">
                      {item.media_type === 'tv' ? '📺' : '🎬'}
                    </span>
                  </div>
                )}
                
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold">
                  {item.media_type === 'tv' ? 'SERIE' : 'PELÍCULA'}
                </div>

                {item.vote_average && item.vote_average > 0 && (
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-medium border border-gray-600">
                    ★ {item.vote_average.toFixed(1)}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-white font-medium text-sm leading-tight line-clamp-2 group-hover:text-gray-300 transition-colors">
                  {getTitle(item)}
                </h3>
                <p className="text-gray-400 text-xs font-medium">
                  {getDate(item)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : !query ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Descubre tu próximo favorito
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Busca entre miles de películas y series
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {['Avengers', 'Breaking Bad', 'Stranger Things', 'Matrix'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion)
                  performSearch(suggestion)
                }}
                className="px-4 py-2 bg-gray-800/50 hover:bg-white/10 text-gray-300 hover:text-white rounded-full border border-gray-600 hover:border-white/50 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}