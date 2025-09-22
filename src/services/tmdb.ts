// TMDB Service - API integration for movies and TV shows
// Documentación: https://developers.themoviedb.org/3

export interface TMDBMovie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  adult: boolean
  original_language: string
  popularity: number
  video: boolean
}

export interface TMDBTVShow {
  id: number
  name: string
  original_name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  adult: boolean
  original_language: string
  popularity: number
  origin_country: string[]
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_results: number
  total_pages: number
}

export interface TMDBMultiSearchResult {
  id: number
  media_type: 'movie' | 'tv' | 'person'
  title?: string // Para películas
  name?: string  // Para series y personas
  overview?: string
  poster_path?: string | null
  backdrop_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  popularity: number
}

class TMDBService {
  private apiKey: string
  private baseURL: string
  private imageBaseURL: string
  private imageOriginalURL: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || ''
    this.baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
    this.imageBaseURL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'
    this.imageOriginalURL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL_ORIGINAL || 'https://image.tmdb.org/t/p/original'

    if (!this.apiKey) {
      console.error('❌ TMDB API Key no encontrada. Agrega NEXT_PUBLIC_TMDB_API_KEY a .env.local')
    }
  }

  // Método helper para hacer requests
  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${this.apiKey}&language=es-ES`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status} - ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error en TMDB request:', error)
      throw error
    }
  }

  // Obtener URL completa de imagen
  getImageURL(path: string | null, size: 'w500' | 'original' = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg' // Placeholder por defecto
    
    const baseUrl = size === 'original' ? this.imageOriginalURL : this.imageBaseURL
    return `${baseUrl}${path}`
  }

  // 🎬 PELÍCULAS
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.makeRequest<TMDBResponse<TMDBMovie>>(`/movie/popular?page=${page}`)
  }

  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.makeRequest<TMDBResponse<TMDBMovie>>(`/movie/top_rated?page=${page}`)
  }

  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.makeRequest<TMDBResponse<TMDBMovie>>(`/movie/upcoming?page=${page}`)
  }

  async getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.makeRequest<TMDBResponse<TMDBMovie>>(`/movie/now_playing?page=${page}`)
  }

  async getMovieDetails(id: number): Promise<TMDBMovie> {
    return this.makeRequest<TMDBMovie>(`/movie/${id}`)
  }

  // 📺 SERIES DE TV
  async getPopularTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.makeRequest<TMDBResponse<TMDBTVShow>>(`/tv/popular?page=${page}`)
  }

  async getTopRatedTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.makeRequest<TMDBResponse<TMDBTVShow>>(`/tv/top_rated?page=${page}`)
  }

  async getOnTheAirTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.makeRequest<TMDBResponse<TMDBTVShow>>(`/tv/on_the_air?page=${page}`)
  }

  async getTVShowDetails(id: number): Promise<TMDBTVShow> {
    return this.makeRequest<TMDBTVShow>(`/tv/${id}`)
  }

  // 🔥 TENDENCIAS
  async getTrending(mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<TMDBMultiSearchResult>> {
    return this.makeRequest<TMDBResponse<TMDBMultiSearchResult>>(`/trending/${mediaType}/${timeWindow}`)
  }

  // 🔍 BÚSQUEDA
  async searchMulti(query: string, page: number = 1): Promise<TMDBResponse<TMDBMultiSearchResult>> {
    const encodedQuery = encodeURIComponent(query.trim())
    return this.makeRequest<TMDBResponse<TMDBMultiSearchResult>>(`/search/multi?query=${encodedQuery}&page=${page}`)
  }

  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    const encodedQuery = encodeURIComponent(query.trim())
    return this.makeRequest<TMDBResponse<TMDBMovie>>(`/search/movie?query=${encodedQuery}&page=${page}`)
  }

  async searchTVShows(query: string, page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    const encodedQuery = encodeURIComponent(query.trim())
    return this.makeRequest<TMDBResponse<TMDBTVShow>>(`/search/tv?query=${encodedQuery}&page=${page}`)
  }

  // 🎭 GÉNEROS
  async getMovieGenres() {
    return this.makeRequest(`/genre/movie/list`)
  }

  async getTVGenres() {
    return this.makeRequest(`/genre/tv/list`)
  }

  // 🔧 UTILIDADES
  formatDate(dateString: string): string {
    if (!dateString) return 'Fecha no disponible'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch {
      return 'Fecha no disponible'
    }
  }

  formatRating(rating: number): string {
    return rating ? `${rating.toFixed(1)}⭐` : 'Sin calificar'
  }

  // Para debug y testing
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/configuration')
      console.log('✅ TMDB API conectada correctamente')
      return true
    } catch (error) {
      console.error('❌ Error conectando con TMDB API:', error)
      return false
    }
  }
}

// Exportar instancia única (singleton)
export const tmdbService = new TMDBService()
export default tmdbService