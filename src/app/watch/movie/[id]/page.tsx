'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { tmdbService } from '@/services/tmdb'
import type { MovieDetails } from '@/services/tmdb'
import VideoPlayer from '@/components/VideoPlayer'

export default function WatchMoviePage() {
  const params = useParams()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const movieId = params.id as string

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true)
        const movieDetails = await tmdbService.getMovieDetails(parseInt(movieId))
        setMovie(movieDetails)
      } catch (err) {
        setError('Error al cargar la película')
        console.error('Error loading movie:', err)
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      loadMovie()
    }
  }, [movieId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando película...</div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Error al cargar la película</h1>
          <p>{error || 'Película no encontrada'}</p>
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
      title={movie.title}
      movieId={parseInt(movieId)}
      type="movie"
      poster={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : undefined}
      sources={[
        'NO_VIDEO_AVAILABLE' // Indicador de simulación
      ]}
    />
  )
}