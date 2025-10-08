'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { tmdbService } from '@/services/tmdb'
import type { TMDBTVShow } from '@/services/tmdb'

export default function SeriesDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [series, setSeries] = useState<TMDBTVShow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const seriesId = params.id as string

  const handleWatchNow = () => {
    router.push(`/watch/series/${seriesId}`)
  }

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Cargando serie...</div>
        </div>
      </div>
    )
  }

  if (error || !series) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">{error || 'Serie no encontrada'}</div>
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
          src={series.backdrop_path ? `https://image.tmdb.org/t/p/original${series.backdrop_path}` : '/placeholder.jpg'}
          alt={series.name}
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
              <span className="text-gray-200 text-sm font-medium tracking-wider">SERIE TV</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Diseño Anónimo Refinado */}
      <div className="relative -mt-40 z-10 container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Poster */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="relative group">
              <Image
                src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : '/placeholder.jpg'}
                alt={series.name}
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
            {/* Título */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                {series.name}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                {series.first_air_date && `Primera emisión: ${series.first_air_date}`}
              </p>
            </div>

            {/* Métricas y datos - Estilo Anónimo */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full flex items-center space-x-2">
                <span className="text-yellow-400">★</span>
                <span className="font-bold">{series.vote_average.toFixed(1)}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                <span className="font-medium">{series.first_air_date?.split('-')[0] || 'N/A'}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                <span className="font-medium">Serie TV</span>
              </div>
              {series.origin_country && series.origin_country.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                  <span className="font-medium">{series.origin_country.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Géneros - Diseño minimalista */}
            {series.genre_ids && series.genre_ids.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {series.genre_ids.slice(0, 5).map((genreId: number, index: number) => (
                  <span
                    key={genreId}
                    className="bg-black/40 border border-white/30 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    Género {index + 1}
                  </span>
                ))}
              </div>
            )}

            {/* Sinopsis */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-white rounded-full"></div>
                <h3 className="text-2xl font-bold tracking-tight">Sinopsis</h3>
              </div>
              <p className="text-lg leading-relaxed text-gray-300 max-w-4xl">
                {series.overview || 'Sin descripción disponible.'}
              </p>
            </div>

            {/* Información adicional */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-white rounded-full"></div>
                <h3 className="text-xl font-bold tracking-tight">Detalles</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-gray-300">
                  <span className="font-medium text-white">Popularidad:</span> {series.popularity?.toFixed(0)}
                </div>
                <div className="text-gray-300">
                  <span className="font-medium text-white">Votos:</span> {series.vote_count} valoraciones
                </div>
              </div>
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
      </div>
    </div>
  )
}