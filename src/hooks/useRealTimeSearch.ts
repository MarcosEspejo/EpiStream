import { useState, useEffect, useCallback, useRef } from 'react'
import tmdbService, { TMDBMultiSearchResult } from '@/services/tmdb'
import { debounce } from '@/utils/debounce'

interface UseRealTimeSearchReturn {
  query: string
  setQuery: (query: string) => void
  results: TMDBMultiSearchResult[]
  loading: boolean
  error: string | null
  clearResults: () => void
}

export function useRealTimeSearch(delay: number = 300): UseRealTimeSearchReturn {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TMDBMultiSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Cache para almacenar resultados previos
  const cacheRef = useRef<Map<string, TMDBMultiSearchResult[]>>(new Map())

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    // Verificar caché primero
    if (cacheRef.current.has(searchQuery)) {
      setResults(cacheRef.current.get(searchQuery)!)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await tmdbService.searchMulti(searchQuery)
      const filteredResults = response.results
        .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
        .slice(0, 8) // Limitar a 8 sugerencias
      
      setResults(filteredResults)
      
      // Guardar en caché (máximo 20 búsquedas para evitar uso excesivo de memoria)
      if (cacheRef.current.size >= 20) {
        const firstKey = cacheRef.current.keys().next().value
        if (firstKey) {
          cacheRef.current.delete(firstKey)
        }
      }
      cacheRef.current.set(searchQuery, filteredResults)
      
    } catch (err) {
      console.error('Error en búsqueda en tiempo real:', err)
      setError('Error al buscar contenido')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Crear función debounced
  const debouncedSearch = useCallback(
    debounce(performSearch, delay),
    [performSearch, delay]
  )

  // Ejecutar búsqueda cuando cambie la query
  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const clearResults = useCallback(() => {
    setResults([])
    setQuery('')
    setError(null)
    setLoading(false)
  }, [])

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearResults
  }
}