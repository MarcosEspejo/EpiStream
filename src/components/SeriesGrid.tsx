'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Series } from '@/types'

interface SeriesGridProps {
  type: 'popular' | 'top_rated' | 'airing_today'
}

export default function SeriesGrid({ type }: SeriesGridProps) {
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // En un proyecto real, aquí harías la llamada a la API de TMDB
    // Por ahora, usamos datos simulados
    setLoading(true)
    setTimeout(() => {
      const simulatedSeries: Series[] = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: `Serie ${i + 1}`,
        overview: `Esta es una descripción de la serie ${i + 1}. Una historia emocionante que te mantendrá enganchado episodio tras episodio.`,
        poster_path: `/series-${i + 1}.jpg`,
        backdrop_path: `/backdrop-${i + 1}.jpg`,
        first_air_date: '2024-01-15',
        vote_average: 7.5 + Math.random() * 2,
        vote_count: 1000 + Math.floor(Math.random() * 9000),
        genre_ids: [18, 9648, 10765],
        origin_country: ['US'],
        original_language: 'en',
        original_name: `Original Series ${i + 1}`,
        popularity: 100 + Math.random() * 900,
      }))
      setSeries(simulatedSeries)
      setLoading(false)
    }, 1000)
  }, [type])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-700 aspect-[2/3] rounded-lg mb-2"></div>
            <div className="bg-gray-700 h-4 rounded mb-1"></div>
            <div className="bg-gray-700 h-3 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {series.map((serie) => (
        <div key={serie.id} className="card-hover cursor-pointer">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
            <Image
              src={`https://picsum.photos/300/450?random=${serie.id + 100}`}
              alt={serie.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
            />
            <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded text-sm font-semibold">
              ⭐ {serie.vote_average.toFixed(1)}
            </div>
          </div>
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
            {serie.name}
          </h3>
          <p className="text-gray-400 text-xs">
            {new Date(serie.first_air_date).getFullYear()}
          </p>
        </div>
      ))}
    </div>
  )
}