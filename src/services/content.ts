// Servicio para obtener enlaces de contenido real
// IMPORTANTE: Solo para proyectos personales

export interface ContentSource {
  url: string
  quality: string
  type: 'movie' | 'series'
  source: string
}

class ContentService {
  // Películas de dominio público reales
  private publicDomainMovies = [
    {
      id: 1,
      title: "Night of the Living Dead",
      url: "https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4",
      quality: "480p"
    },
    {
      id: 2, 
      title: "Plan 9 from Outer Space",
      url: "https://archive.org/download/plan_nine_from_outer_space/plan_nine_from_outer_space_512kb.mp4",
      quality: "480p"
    },
    {
      id: 3,
      title: "The Phantom of the Opera (1925)",
      url: "https://archive.org/download/ThePhantomOfTheOpera1925/The%20Phantom%20of%20the%20Opera%20%281925%29.mp4",
      quality: "360p"
    },
    {
      id: 4,
      title: "Carnival of Souls",
      url: "https://archive.org/download/carnival_of_souls/carnival_of_souls_512kb.mp4", 
      quality: "480p"
    },
    {
      id: 5,
      title: "Attack of the Giant Leeches",
      url: "https://archive.org/download/AttackOfTheGiantLeeches/AttackOfTheGiantLeeches.mp4",
      quality: "360p"
    }
  ]

  // Documentales gratuitos
  private freeDocumentaries = [
    {
      id: 101,
      title: "Internet Archive Documentary",
      url: "https://archive.org/download/InternetArchive/InternetArchive.mp4",
      quality: "720p"
    }
  ]

  async getMovieStream(tmdbId: number): Promise<ContentSource | null> {
    // Para proyectos personales - usar películas de dominio público
    const publicMovie = this.publicDomainMovies[tmdbId % this.publicDomainMovies.length]
    
    if (publicMovie) {
      return {
        url: publicMovie.url,
        quality: publicMovie.quality,
        type: 'movie',
        source: 'Archive.org'
      }
    }

    // Fallback a videos demo si no hay contenido disponible
    const demoUrls = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    ]

    return {
      url: demoUrls[tmdbId % demoUrls.length],
      quality: '720p',
      type: 'movie', 
      source: 'Demo'
    }
  }

  async getSeriesStream(tmdbId: number, season: number = 1, episode: number = 1): Promise<ContentSource | null> {
    // Para series, usar contenido demo por ahora
    return {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      quality: '720p',
      type: 'series',
      source: 'Demo'
    }
  }

  // Método para YouTube trailers (legal y oficial)
  getOfficialTrailer(tmdbId: number): string | null {
    // Esto lo conectaremos con la API de TMDB que ya tienes
    // Ya obtiene los trailers oficiales
    return null
  }
}

export const contentService = new ContentService()
export default contentService