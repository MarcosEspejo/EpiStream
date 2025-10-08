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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Cargando...</div>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">{error || 'Película no encontrada'}</div>
          <button 
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            ← Regresar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Backdrop - Diseño Anónimo */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '/placeholder.jpg'}
          alt={movie.title}
          fill
          className="object-cover"
        />
        {/* Gradientes superpuestos para el efecto Anónimo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        
        {/* Contenido superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-gray-200 text-sm font-medium tracking-wider">PELÍCULA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Diseño Anónimo Refinado */}
      <div className="relative -mt-40 z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Poster */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="relative group">
              <Image
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
                alt={movie.title}
                width={320}
                height={480}
                className="rounded-2xl shadow-2xl mx-auto lg:mx-0 border border-white/10 group-hover:border-white/20 transition-all duration-300"
              />
              {/* Glow effect sutil */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 blur-xl"></div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-white space-y-8">
            {/* Título y tagline */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-2xl text-gray-400 italic font-light leading-relaxed">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Métricas y datos - Estilo Anónimo */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full flex items-center space-x-2">
                <span className="text-yellow-400">★</span>
                <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                <span className="font-medium">{movie.release_date?.split('-')[0] || 'N/A'}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                <span className="font-medium">{movie.runtime} min</span>
              </div>
            </div>

            {/* Géneros - Diseño minimalista */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="bg-black/40 border border-white/30 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Sinopsis */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-white rounded-full"></div>
                <h3 className="text-2xl font-bold tracking-tight">Sinopsis</h3>
              </div>
              <p className="text-lg leading-relaxed text-gray-300 max-w-4xl">
                {movie.overview || 'Sin descripción disponible.'}
              </p>
            </div>

            {/* Botones de acción - Estilo Anónimo */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleWatchNow}
                className="group bg-white text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-gray-200 flex items-center justify-center space-x-3"
              >
                <span className="transform group-hover:scale-110 transition-transform duration-300">▶</span>
                <span>Ver Ahora</span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30">
                + Mi Lista
              </button>
            </div>
          </div>
        </div>

        {/* Cast - Diseño Anónimo */}
        {cast.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h3 className="text-3xl font-bold text-white tracking-tight">Reparto Principal</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center group">
                  <div className="relative mb-3">
                    <Image
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/placeholder-person.jpg'}
                      alt={actor.name}
                      width={120}
                      height={180}
                      className="rounded-xl mx-auto border border-white/10 group-hover:border-white/20 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <p className="text-white text-sm font-bold mb-1">{actor.name}</p>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailers - Diseño Anónimo */}
        {videos.length > 0 && (
          <div className="mt-20 pb-20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h3 className="text-3xl font-bold text-white tracking-tight">Trailers</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="group">
                  <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-gray-300 text-sm font-medium mt-3 text-center">{video.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}