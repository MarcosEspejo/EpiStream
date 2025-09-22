'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { tmdbService } from '@/services/tmdb'
import type { TMDBTVShow } from '@/services/tmdb'

export default function SeriesDetailsPage() {
  const params = useParams()
  const [series, setSeries] = useState<TMDBTVShow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const seriesId = params.id as string

  useEffect(() => {
    const loadSeriesDetails = async () => {
      try {
        setLoading(true)
        const seriesDetails = await tmdbService.getTVShowDetails(parseInt(seriesId))
        setSeries(seriesDetails)
      } catch (err) {
        setError('Error al cargar los detalles de la serie')
        console.error('Error loading series details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (seriesId) {
      loadSeriesDetails()
    }
  }, [seriesId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  if (error || !series) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">{error || 'Serie no encontrada'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Backdrop */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={series.backdrop_path ? `https://image.tmdb.org/t/p/original${series.backdrop_path}` : '/placeholder.jpg'}
          alt={series.name}
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <Image
              src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : '/placeholder.jpg'}
              alt={series.name}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl mx-auto md:mx-0"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{series.name}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ {series.vote_average.toFixed(1)}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {series.first_air_date?.split('-')[0] || 'N/A'}
              </span>
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                Serie TV
              </span>
            </div>

            {/* Sinopsis */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Sinopsis</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                {series.overview || 'Sin descripción disponible.'}
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mb-8">
              <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                ▶ Ver Ahora
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                + Mi Lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}