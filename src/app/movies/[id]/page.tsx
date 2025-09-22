'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { tmdbService } from '@/services/tmdb'
import type { MovieDetails, CastMember, Video } from '@/services/tmdb'

export default function MovieDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const movieId = params.id as string

  const handleWatchNow = () => {
    router.push(`/watch/movie/${movieId}`)
  }

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true)
        const [movieDetails, movieCast, movieVideos] = await Promise.all([
          tmdbService.getMovieDetails(parseInt(movieId)),
          tmdbService.getMovieCredits(parseInt(movieId)),
          tmdbService.getMovieVideos(parseInt(movieId))
        ])
        
        setMovie(movieDetails)
        setCast(movieCast.cast.slice(0, 10)) // Solo los primeros 10
        setVideos(movieVideos.results.filter((v: Video) => v.type === 'Trailer').slice(0, 2))
      } catch (err) {
        setError('Error al cargar los detalles de la película')
        console.error('Error loading movie details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      loadMovieDetails()
    }
  }, [movieId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">{error || 'Película no encontrada'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Backdrop */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '/placeholder.jpg'}
          alt={movie.title}
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
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl mx-auto md:mx-0"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-xl italic text-gray-300 mb-6">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {movie.release_date?.split('-')[0] || 'N/A'}
              </span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {movie.runtime} min
              </span>
            </div>

            {/* Géneros */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Sinopsis */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Sinopsis</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                {movie.overview || 'Sin descripción disponible.'}
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={handleWatchNow}
                className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                ▶ Ver Ahora
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                + Mi Lista
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-white mb-6">Reparto Principal</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <Image
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/placeholder-person.jpg'}
                    alt={actor.name}
                    width={100}
                    height={150}
                    className="rounded-lg mx-auto mb-2"
                  />
                  <p className="text-white text-sm font-semibold">{actor.name}</p>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailers */}
        {videos.length > 0 && (
          <div className="mt-12 pb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Trailers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}