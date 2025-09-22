'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '@/types'
import tmdbService, { TMDBMovie, TMDBTVShow } from '@/services/tmdb'

interface MovieGridProps {
  type: 'popular' | 'top_rated' | 'upcoming' | 'tv'
  limit?: number
}

export default function MovieGrid({ type, limit = 100 }: MovieGridProps) {
  const [content, setContent] = useState<(TMDBMovie | TMDBTVShow)[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      setError(null)
      
      try {
        let allResults: (TMDBMovie | TMDBTVShow)[] = []
        
        // Obtener múltiples páginas para más contenido
        const pagesToFetch = Math.ceil(limit / 20) // TMDB devuelve ~20 por página
        
        for (let page = 1; page <= pagesToFetch; page++) {
          let response
          
          switch (type) {
            case 'popular':
              response = await tmdbService.getPopularMovies(page)
              break
            case 'top_rated':
              response = await tmdbService.getTopRatedMovies(page)
              break
            case 'upcoming':
              response = await tmdbService.getUpcomingMovies(page)
              break
            case 'tv':
              response = await tmdbService.getPopularTVShows(page)
              break
            default:
              response = await tmdbService.getPopularMovies(page)
          }
          
          allResults = [...allResults, ...response.results]
          
          // Si ya tenemos suficiente contenido, parar
          if (allResults.length >= limit) break
        }
        
        // Limitar al número exacto solicitado
        const results = allResults.slice(0, limit)
        setContent(results)
        
      } catch (err) {
        console.error('Error fetching content:', err)
        setError('Error cargando contenido. Por favor verifica tu API key de TMDB.')
        
        // Fallback a datos simulados en caso de error
        const fallbackContent = Array.from({ length: limit }, (_, i) => ({
          id: i + 1,
          title: `${type === 'tv' ? 'Serie Popular' : 'Película Popular'} ${i + 1}`,
          name: `${type === 'tv' ? 'Serie Popular' : 'Película Popular'} ${i + 1}`,
          overview: `Una ${type === 'tv' ? 'serie' : 'película'} emocionante que te mantendrá enganchado desde el primer momento.`,
          poster_path: null,
          backdrop_path: null,
          release_date: '2024-01-15',
          first_air_date: '2024-01-15',
          vote_average: 7.5 + Math.random() * 2,
          vote_count: 1000 + Math.floor(Math.random() * 9000),
          genre_ids: [28, 12, 878],
          adult: false,
          original_language: 'es',
          original_title: `Título Original ${i + 1}`,
          original_name: `Nombre Original ${i + 1}`,
          popularity: 100 + Math.random() * 900,
          video: false,
          origin_country: ['ES'],
        }))
        setContent(fallbackContent as any)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [type, limit])

  // Función helper para obtener el título
  const getTitle = (item: TMDBMovie | TMDBTVShow): string => {
    return 'title' in item ? item.title : item.name
  }

  // Función helper para obtener la fecha
  const getDate = (item: TMDBMovie | TMDBTVShow): string => {
    const date = 'release_date' in item ? item.release_date : item.first_air_date
    return date ? new Date(date).getFullYear().toString() : 'TBA'
  }

  // Función helper para obtener el slug de la URL
  const getSlug = (item: TMDBMovie | TMDBTVShow): string => {
    const title = getTitle(item)
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="group animate-pulse">
            {/* Placeholder poster */}
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-3 right-3 w-10 h-6 bg-gray-600 rounded"></div>
            </div>
            {/* Placeholder title */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-600 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
        <div className="text-gray-400 text-sm">
          Asegúrate de agregar tu API key de TMDB en el archivo .env.local
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {content.map((item) => (
        <Link
          key={item.id}
          href={`/${type === 'tv' ? 'series' : 'movies'}/${item.id}-${getSlug(item)}`}
          className="group cursor-pointer block"
        >
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 card-hover bg-gradient-to-br from-gray-800 to-gray-900">
            {item.poster_path ? (
              <Image
                src={tmdbService.getImageURL(item.poster_path)}
                alt={getTitle(item)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 flex items-center justify-center">
                <span className="text-6xl opacity-20">
                  {type === 'tv' ? '📺' : '🎬'}
                </span>
              </div>
            )}
            
            {/* Rating badge */}
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-lg text-sm font-bold border border-yellow-400/20">
              ⭐ {item.vote_average.toFixed(1)}
            </div>

            {/* Hover overlay with info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-gray-300 line-clamp-3 mb-2">
                  {item.overview || 'Sin descripción disponible'}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{tmdbService.formatRating(item.vote_average)}</span>
                  <span>{item.vote_count} votos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title and year */}
          <div className="space-y-1">
            <h3 className="text-white font-medium text-sm leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
              {getTitle(item)}
            </h3>
            <p className="text-gray-400 text-xs font-medium">
              {getDate(item)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}