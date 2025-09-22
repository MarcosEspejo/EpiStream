'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { tmdbService } from '@/services/tmdb'
import type { TMDBTVShow } from '@/services/tmdb'
import VideoPlayer from '@/components/VideoPlayer'

export default function WatchSeriesPage() {
  const params = useParams()
  const [series, setSeries] = useState<TMDBTVShow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const seriesId = params.id as string

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true)
        const seriesDetails = await tmdbService.getTVShowDetails(parseInt(seriesId))
        setSeries(seriesDetails)
      } catch (err) {
        setError('Error al cargar la serie')
        console.error('Error loading series:', err)
      } finally {
        setLoading(false)
      }
    }

    if (seriesId) {
      loadSeries()
    }
  }, [seriesId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando serie...</div>
      </div>
    )
  }

  if (error || !series) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Error al cargar la serie</h1>
          <p>{error || 'Serie no encontrada'}</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <VideoPlayer
      title={series.name}
      movieId={parseInt(seriesId)}
      poster={series.backdrop_path ? `https://image.tmdb.org/t/p/original${series.backdrop_path}` : undefined}
      sources={[
        // En producción, aquí irían las URLs reales del video
        // Por ahora usamos videos de demo
      ]}
    />
  )
}