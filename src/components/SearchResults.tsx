'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Movie, Series } from '@/types'

type SearchResult = (Movie | Series) & { media_type: 'movie' | 'tv' }

export default function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    // Simulamos una búsqueda - en un proyecto real harías la llamada a la API
    setTimeout(() => {
      const simulatedResults: SearchResult[] = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        media_type: i % 2 === 0 ? 'movie' : 'tv',
        title: i % 2 === 0 ? `Película ${query} ${i + 1}` : undefined,
        name: i % 2 === 1 ? `Serie ${query} ${i + 1}` : undefined,
        overview: `Resultado de búsqueda para "${query}". Esta es una descripción del contenido encontrado.`,
        poster_path: `/search-${i + 1}.jpg`,
        backdrop_path: `/backdrop-${i + 1}.jpg`,
        release_date: i % 2 === 0 ? '2024-01-15' : undefined,
        first_air_date: i % 2 === 1 ? '2024-01-15' : undefined,
        vote_average: 7.5 + Math.random() * 2,
        vote_count: 1000 + Math.floor(Math.random() * 9000),
        genre_ids: [28, 12, 878],
        adult: false,
        original_language: 'en',
        original_title: i % 2 === 0 ? `Original ${query} ${i + 1}` : undefined,
        original_name: i % 2 === 1 ? `Original ${query} ${i + 1}` : undefined,
        popularity: 100 + Math.random() * 900,
        video: false,
        origin_country: i % 2 === 1 ? ['US'] : undefined,
      }))
      setResults(simulatedResults)
      setLoading(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Busca películas y series..."
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim() || loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Resultados */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 aspect-[2/3] rounded-lg mb-2"></div>
              <div className="bg-gray-700 h-4 rounded mb-1"></div>
              <div className="bg-gray-700 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Resultados para "{query}"
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map((item) => (
              <div key={item.id} className="card-hover cursor-pointer">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={`https://picsum.photos/300/450?random=${item.id + 200}`}
                    alt={(item as Movie).title || (item as Series).name || 'No Title'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded text-sm font-semibold">
                    ⭐ {item.vote_average.toFixed(1)}
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {item.media_type === 'movie' ? 'PELÍCULA' : 'SERIE'}
                  </div>
                </div>
                <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                  {(item as Movie).title || (item as Series).name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {new Date(
                    (item as Movie).release_date || (item as Series).first_air_date || ''
                  ).getFullYear()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No se encontraron resultados para "{query}"
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Escribe algo para buscar películas y series
          </p>
        </div>
      )}
    </div>
  )
}