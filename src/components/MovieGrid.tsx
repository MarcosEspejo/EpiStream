'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Movie } from '@/types'

interface MovieGridProps {
  type: 'popular' | 'top_rated' | 'upcoming' | 'tv'
}

export default function MovieGrid({ type }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // En un proyecto real, aquí harías la llamada a la API de TMDB
    // Por ahora, usamos datos simulados
    setLoading(true)
    setTimeout(() => {
      const simulatedMovies: Movie[] = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `${type === 'tv' ? 'Serie' : 'Película'} ${i + 1}`,
        overview: `Esta es una descripción de la ${type === 'tv' ? 'serie' : 'película'} ${i + 1}. Una historia emocionante que te mantendrá enganchado.`,
        poster_path: `/movie-${i + 1}.jpg`,
        backdrop_path: `/backdrop-${i + 1}.jpg`,
        release_date: '2024-01-15',
        vote_average: 7.5 + Math.random() * 2,
        vote_count: 1000 + Math.floor(Math.random() * 9000),
        genre_ids: [28, 12, 878],
        adult: false,
        original_language: 'en',
        original_title: `Original Title ${i + 1}`,
        popularity: 100 + Math.random() * 900,
        video: false,
      }))
      setMovies(simulatedMovies)
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
      {movies.map((movie) => (
        <div key={movie.id} className="card-hover cursor-pointer">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
            <Image
              src={`https://picsum.photos/300/450?random=${movie.id}`}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
            />
            <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded text-sm font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>
          </div>
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      ))}
    </div>
  )
}