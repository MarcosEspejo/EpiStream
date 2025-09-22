// Servicio para obtener enlaces de contenido libre
// Para proyectos personales - usa fuentes abiertas y gratuitas

import { alternativeContentService } from './alternative-content'

export interface ContentSource {
  url: string
  quality: string
  type: 'movie' | 'series'
  source: string
}

class ContentService {
  // APIs y fuentes de contenido libre
  private freeContentAPIs = {
    // Internet Archive - contenido de dominio público
    archive: 'https://archive.org/download/',
    // Pexels Videos - contenido libre
    pexels: 'https://www.pexels.com/video/',
    // Vimeo creative commons
    vimeo: 'https://vimeo.com/',
  }

  // Base de datos expandida de contenido libre
  private freeContent = [
    // Películas completas disponibles libremente
    {
      id: 1,
      title: "The Cabinet of Dr. Caligari",
      url: "https://archive.org/download/TheCabinetOfDr.Caligari/The%20Cabinet%20of%20Dr.%20Caligari_512kb.mp4",
      quality: "480p",
      year: "1920"
    },
    {
      id: 2,
      title: "Nosferatu",
      url: "https://archive.org/download/Nosferatu1922/Nosferatu%20%281922%29.mp4",
      quality: "720p", 
      year: "1922"
    },
    {
      id: 3,
      title: "Metropolis",
      url: "https://archive.org/download/Metropolis1927_201311/Metropolis1927.mp4",
      quality: "720p",
      year: "1927"
    },
    {
      id: 4,
      title: "The Great Train Robbery",
      url: "https://archive.org/download/TheGreatTrainRobbery1903/The%20Great%20Train%20Robbery%20%281903%29.mp4",
      quality: "360p",
      year: "1903"
    },
    {
      id: 5,
      title: "A Trip to the Moon",
      url: "https://archive.org/download/LeVoyageDansLaLune/A%20Trip%20to%20the%20Moon%20%28Le%20Voyage%20Dans%20La%20Lune%29%20-%201902%20-%20Georges%20Melies.mp4",
      quality: "480p",
      year: "1902"
    },
    {
      id: 6,
      title: "The Birth of a Nation",
      url: "https://archive.org/download/dw_griffith_birth_of_a_nation/Birth_of_a_Nation_DW_Griffith_1915.mp4",
      quality: "480p",
      year: "1915"
    },
    {
      id: 7,
      title: "Intolerance",
      url: "https://archive.org/download/Intolerance1916/Intolerance%20%281916%29.mp4", 
      quality: "480p",
      year: "1916"
    },
    {
      id: 8,
      title: "Battleship Potemkin",
      url: "https://archive.org/download/BattleshipPotemkin/Battleship%20Potemkin.mp4",
      quality: "720p",
      year: "1925"
    }
  ]

  // Contenido moderno libre disponible
  private modernFreeContent = [
    {
      id: 101,
      title: "Big Buck Bunny",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      quality: "720p"
    },
    {
      id: 102,
      title: "Sintel",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", 
      quality: "720p"
    },
    {
      id: 103,
      title: "Tears of Steel",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      quality: "720p"
    },
    {
      id: 104,
      title: "Elephant Dream",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      quality: "720p"
    }
  ]

  async getMovieStream(tmdbId: number): Promise<ContentSource | null> {
    // Primero intentar con fuentes alternativas dinámicas
    try {
      const alternativeUrls = alternativeContentService.generateContentUrls(tmdbId)
      const workingUrl = await alternativeContentService.findWorkingStream(alternativeUrls)
      
      if (workingUrl) {
        return {
          url: workingUrl,
          quality: '720p',
          type: 'movie',
          source: workingUrl.includes('archive.org') ? 'Archive.org' : 'Free Content'
        }
      }
    } catch (error) {
      console.log('Alternative sources not available, using local content')
    }
    
    // Combinar todo el contenido disponible local
    const allContent = [...this.freeContent, ...this.modernFreeContent]
    
    // Seleccionar contenido basado en el ID de TMDB
    const selectedContent = allContent[tmdbId % allContent.length]
    
    if (selectedContent) {
      return {
        url: selectedContent.url,
        quality: selectedContent.quality,
        type: 'movie',
        source: selectedContent.url.includes('archive.org') ? 'Archive.org' : 'Creative Commons'
      }
    }

    // Fallback ultra-confiable
    return {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      quality: '720p',
      type: 'movie',
      source: 'Demo'
    }
  }

  async getSeriesStream(tmdbId: number, season: number = 1, episode: number = 1): Promise<ContentSource | null> {
    // Para series, rotar entre contenido disponible
    const seriesContent = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
    ]

    const selectedUrl = seriesContent[tmdbId % seriesContent.length]

    return {
      url: selectedUrl,
      quality: '720p',
      type: 'series',
      source: 'Creative Commons'
    }
  }

  // Método para contenido aleatorio
  getRandomContent(): ContentSource {
    const allContent = [...this.freeContent, ...this.modernFreeContent]
    const random = allContent[Math.floor(Math.random() * allContent.length)]
    
    return {
      url: random.url,
      quality: random.quality,
      type: 'movie',
      source: random.url.includes('archive.org') ? 'Archive.org' : 'Creative Commons'
    }
  }

  // Lista todos los contenidos disponibles
  getAllAvailableContent() {
    return {
      classic: this.freeContent,
      modern: this.modernFreeContent,
      total: this.freeContent.length + this.modernFreeContent.length
    }
  }
}

export const contentService = new ContentService()
export default contentService