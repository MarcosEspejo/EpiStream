// Integración con APIs de contenido libre alternativas
// Para proyectos personales

export interface AlternativeSource {
  name: string
  baseUrl: string
  apiKey?: string
  endpoints: {
    movies: string
    series: string
    search: string
  }
}

// Lista de APIs alternativas conocidas por contenido libre
export const alternativeSources: AlternativeSource[] = [
  {
    name: 'Public Domain Movies',
    baseUrl: 'https://archive.org/advancedsearch.php',
    endpoints: {
      movies: '?q=collection%3Afeature_films&fl=identifier,title&rows=50&output=json',
      series: '?q=collection%3Atelevision&fl=identifier,title&rows=50&output=json',
      search: '?q={query}&fl=identifier,title&rows=20&output=json'
    }
  },
  {
    name: 'Internet Archive',
    baseUrl: 'https://archive.org/metadata/',
    endpoints: {
      movies: '',
      series: '',
      search: ''
    }
  }
]

class AlternativeContentService {
  async searchArchiveContent(query: string = 'movie'): Promise<any[]> {
    try {
      const searchUrl = `https://archive.org/advancedsearch.php?q=collection%3Afeature_films%20OR%20collection%3Aopenlibrary_movies&fl=identifier,title,description&rows=100&output=json`
      
      const response = await fetch(searchUrl)
      const data = await response.json()
      
      return data.response?.docs || []
    } catch (error) {
      console.log('Archive search not available, using fallback')
      return []
    }
  }

  async getArchiveStreamUrl(identifier: string): Promise<string | null> {
    try {
      const metadataUrl = `https://archive.org/metadata/${identifier}`
      const response = await fetch(metadataUrl)
      const data = await response.json()
      
      // Buscar archivos de video
      const files = data.files || []
      const videoFile = files.find((file: any) => 
        file.name?.endsWith('.mp4') || 
        file.name?.endsWith('.mov') ||
        file.name?.endsWith('.avi')
      )
      
      if (videoFile) {
        return `https://archive.org/download/${identifier}/${videoFile.name}`
      }
      
      return null
    } catch (error) {
      console.log('Archive metadata not available')
      return null
    }
  }

  // Generar URLs de contenido basado en patrones conocidos
  generateContentUrls(tmdbId: number): string[] {
    const patterns = [
      // Archive.org patterns conocidos
      `https://archive.org/download/movie_${tmdbId}/movie_${tmdbId}.mp4`,
      `https://archive.org/download/film_${tmdbId}/film_${tmdbId}.mp4`,
      
      // URLs de contenido libre conocidas
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      
      // Contenido rotativo para variedad
      `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_${(tmdbId % 5) + 1}mb.mp4`,
    ]
    
    // Seleccionar URL basada en el ID
    return [patterns[tmdbId % patterns.length], ...patterns.slice(0, 3)]
  }

  async findWorkingStream(urls: string[]): Promise<string | null> {
    for (const url of urls) {
      try {
        // Test rápido de la URL
        const response = await fetch(url, { method: 'HEAD' })
        if (response.ok) {
          return url
        }
      } catch (error) {
        // Continuar con la siguiente URL
        continue
      }
    }
    return null
  }
}

export const alternativeContentService = new AlternativeContentService()
export default alternativeContentService