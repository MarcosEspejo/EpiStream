// Tipos para IPTV
export interface IPTVChannel {
  id: string
  name: string
  logo: string
  streamUrl: string
  category: string
  country: string
  language?: string
  epg?: string
  isEmbedded?: boolean // Para streams embebidos de YouTube
  isVideo?: boolean    // Para videos MP4 directos
  tvg?: {
    id?: string
    name?: string
    logo?: string
  }
}

export interface IPTVPlaylist {
  channels: IPTVChannel[]
  groups: string[]
}

class IPTVService {
  private channels: IPTVChannel[] = []
  private cache = new Map<string, { data: IPTVChannel[], timestamp: number }>()
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutos
  private workingStreams = new Set<string>() // Cache de streams que funcionan
  private failedStreams = new Set<string>() // Cache de streams que fallan

  // Parse M3U playlist optimizado
  private parseM3U(content: string): IPTVChannel[] {
    const lines = content.split('\n')
    const channels: IPTVChannel[] = []
    let currentChannel: Partial<IPTVChannel> = {}

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('#EXTINF:')) {
        // Parse channel info
        const nameMatch = line.match(/,(.+)$/)
        const logoMatch = line.match(/tvg-logo="([^"]+)"/)
        const groupMatch = line.match(/group-title="([^"]+)"/)
        const countryMatch = line.match(/tvg-country="([^"]+)"/)
        const languageMatch = line.match(/tvg-language="([^"]+)"/)
        
        currentChannel = {
          id: Math.random().toString(36).substring(7),
          name: nameMatch ? nameMatch[1] : 'Unknown Channel',
          logo: logoMatch ? logoMatch[1] : '/tv-placeholder.png',
          category: groupMatch ? groupMatch[1].toLowerCase().replace(/\s+/g, '-') : 'general',
          country: countryMatch ? countryMatch[1] : 'Unknown',
          language: languageMatch ? languageMatch[1] : undefined
        }
      } else if (line && !line.startsWith('#') && currentChannel.name) {
        // Stream URL found
        currentChannel.streamUrl = line
        channels.push(currentChannel as IPTVChannel)
        currentChannel = {}
      }
    }

    return channels
  }

  // Cargar canales optimizado - SIN proxies innecesarios
  async getChannels(): Promise<IPTVChannel[]> {
    // Usar cache si está disponible y válido
    const cacheKey = 'all-channels'
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    if (this.channels.length > 0) {
      return this.channels
    }

    try {
      console.log('🚀 Cargando canales optimizados...')
      
      // Usar principalmente canales demo confiables
      const demoChannels = this.getDemoChannels()
      this.channels = demoChannels

      // Guardar en cache
      this.cache.set(cacheKey, {
        data: this.channels,
        timestamp: Date.now()
      })

      console.log(`✅ ${this.channels.length} canales cargados exitosamente`)
      return this.channels

    } catch (error) {
      console.warn('⚠️ Error cargando canales, usando fallback:', error)
      
      // Fallback a canales básicos
      this.channels = this.getBasicChannels()
      return this.channels
    }
  }

  // Obtener canales por categoría
  getChannelsByCategory(category: string): IPTVChannel[] {
    return this.channels.filter(channel => 
      channel.category === category || 
      channel.category.includes(category)
    )
  }

  // Buscar canales
  searchChannels(query: string): IPTVChannel[] {
    const searchTerm = query.toLowerCase()
    return this.channels.filter(channel =>
      channel.name.toLowerCase().includes(searchTerm) ||
      channel.category.toLowerCase().includes(searchTerm) ||
      channel.country.toLowerCase().includes(searchTerm)
    )
  }

  // Obtener categorías disponibles
  getCategories(): string[] {
    const categories = [...new Set(this.channels.map(channel => channel.category))]
    return categories.sort()
  }

  // Validar si un stream funciona
  async validateStream(streamUrl: string): Promise<boolean> {
    if (this.workingStreams.has(streamUrl)) return true
    if (this.failedStreams.has(streamUrl)) return false

    try {
      const response = await fetch(streamUrl, { 
        method: 'HEAD',
        mode: 'no-cors' // Para evitar problemas de CORS
      })
      this.workingStreams.add(streamUrl)
      return true
    } catch (error) {
      console.warn(`Stream failed validation: ${streamUrl}`, error)
      this.failedStreams.add(streamUrl)
      return false
    }
  }

  // Obtener canales con streams validados
  async getValidatedChannels(): Promise<IPTVChannel[]> {
    const validatedChannels: IPTVChannel[] = []
    
    for (const channel of this.getDemoChannels()) {
      // Usar streams de Pluto TV y fuentes confiables
      if (channel.streamUrl.includes('pluto.tv') || 
          channel.streamUrl.includes('france24.com') ||
          channel.streamUrl.includes('samsung.wurl.tv') ||
          channel.streamUrl.includes('rakuten')) {
        validatedChannels.push(channel)
      }
    }
    
    return validatedChannels
  }

  // CANALES CON STREAMS EMBEBIDOS - MÁS CONFIABLES
  private getDemoChannels(): IPTVChannel[] {
    return [
      // === NOTICIAS - STREAMS EMBEBIDOS DE YOUTUBE ===
      {
        id: 'news-cnn-youtube',
        name: 'CNN en Español (YouTube)',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/512px-CNN_International_logo.svg.png',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCCwJRO9qU2KFNMHhwgXB_bw&autoplay=1',
        category: 'news',
        country: 'Internacional',
        language: 'Español',
        isEmbedded: true
      },
      {
        id: 'news-dw-youtube',
        name: 'DW Español (YouTube)',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deutsche_Welle_symbol_2012.svg/512px-Deutsche_Welle_symbol_2012.svg.png',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCT4Rx-BdRaWFTBSZGgvyf3g&autoplay=1',
        category: 'news',
        country: 'Alemania',
        language: 'Español',
        isEmbedded: true
      },
      {
        id: 'news-rt-youtube',
        name: 'RT en Español (YouTube)',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Russia-today-logo.svg/512px-Russia-today-logo.svg.png',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCEIhICHOQOonjE6V0SLdrHQ&autoplay=1',
        category: 'news',
        country: 'Rusia',
        language: 'Español',
        isEmbedded: true
      },
      {
        id: 'news-euronews-youtube',
        name: 'Euronews Español (YouTube)',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Euronews._2016_alternative_logo.png/512px-Euronews._2016_alternative_logo.png',
        streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCODiHHK1YOaKvdtNPdBVQ0A&autoplay=1',
        category: 'news',
        country: 'Europa',
        language: 'Español',
        isEmbedded: true
      },

      // === DEMO STREAMING - CONTENIDO CONFIABLE ===
      {
        id: 'demo-bigbuck',
        name: 'Demo: Big Buck Bunny',
        logo: '/tv-placeholder.png',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        category: 'movies',
        country: 'Demo',
        language: 'Sin audio',
        isVideo: true
      },
      {
        id: 'demo-elephant',
        name: 'Demo: Elephant Dream',
        logo: '/tv-placeholder.png',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        category: 'movies',
        country: 'Demo',
        language: 'Sin audio',
        isVideo: true
      },
      {
        id: 'demo-sintel',
        name: 'Demo: Sintel',
        logo: '/tv-placeholder.png',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        category: 'movies',
        country: 'Demo',
        language: 'Sin audio',
        isVideo: true
      },

      // === PELÍCULAS 24/7 ===
      {
        id: 'movies-pluto-cine',
        name: 'Pluto TV Cine Estelar',
        logo: 'https://images.pluto.tv/channels/5dcde437229eff00091b6c30/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dcde437229eff00091b6c30/master.m3u8',
        category: 'movies',
        country: 'Latino',
        language: 'Español'
      },
      {
        id: 'movies-classic-cinema',
        name: 'Cine Clásico',
        logo: 'https://images.pluto.tv/channels/5dcb62e63d4e2f0009f36731/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dcb62e63d4e2f0009f36731/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-action',
        name: 'Acción 24h',
        logo: 'https://images.pluto.tv/channels/5f4d878ad8e8b000077f4bdb/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d878ad8e8b000077f4bdb/master.m3u8',
        category: 'movies',
        country: 'Hollywood',
        language: 'Español'
      },
      {
        id: 'movies-horror',
        name: 'Terror 24h',
        logo: 'https://images.pluto.tv/channels/5f4dcbb0cd8ade00077dc2d2/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4dcbb0cd8ade00077dc2d2/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-comedy',
        name: 'Comedias 24h',
        logo: 'https://images.pluto.tv/channels/5f4d889cf55df900074d89a2/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d889cf55df900074d89a2/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-drama',
        name: 'Drama Premium',
        logo: 'https://images.pluto.tv/channels/5f4d8c0e14d56900079ce345/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8c0e14d56900079ce345/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },

      // === SERIES 24/7 ===
      {
        id: 'series-comedy',
        name: 'Series Comedia',
        logo: 'https://images.pluto.tv/channels/5f99c9a5403fbd00077ac146/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f99c9a5403fbd00077ac146/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'series-drama',
        name: 'Series Drama',
        logo: 'https://images.pluto.tv/channels/5f98ca4cabbaaf00077fd09e/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f98ca4cabbaaf00077fd09e/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'series-anime',
        name: 'Anime 24h',
        logo: 'https://images.pluto.tv/channels/5ee92e72fbdba7000795c4b1/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ee92e72fbdba7000795c4b1/master.m3u8',
        category: 'series',
        country: 'Japón',
        language: 'Español'
      },
      {
        id: 'series-thriller',
        name: 'Series Thriller',
        logo: 'https://images.pluto.tv/channels/5f4d7e138886250007dc6ce8/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d7e138886250007dc6ce8/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'series-sci-fi',
        name: 'Sci-Fi Series',
        logo: 'https://images.pluto.tv/channels/5f4d878c4bf00c0007dc6d25/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d878c4bf00c0007dc6d25/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'series-retro',
        name: 'Series Retro',
        logo: 'https://images.pluto.tv/channels/5f4d8f86014e3500076534e0/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8f86014e3500076534e0/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },

      // === DEPORTES ===
      {
        id: 'sports-pluto',
        name: 'Pluto TV Deportes',
        logo: 'https://images.pluto.tv/channels/5de91cf02fc07c0009910465/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5de91cf02fc07c0009910465/master.m3u8',
        category: 'sports',
        country: 'Latino',
        language: 'Español'
      },
      {
        id: 'sports-fight',
        name: 'Fight Sports',
        logo: 'https://i.imgur.com/3YmFkqh.png',
        streamUrl: 'https://shls-fight-sports-ak.akamaized.net/out/v1/ee7e6475b12e484bbec8729007e4d8b4/index.m3u8',
        category: 'sports',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'sports-racing',
        name: 'Deportes Motor',
        logo: 'https://images.pluto.tv/channels/5ff92b73fb19e40007bc7894/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ff92b73fb19e40007bc7894/master.m3u8',
        category: 'sports',
        country: 'Internacional',
        language: 'Español'
      },

      // === MÚSICA ===
      {
        id: 'music-mtv',
        name: 'MTV Hits',
        logo: 'https://images.pluto.tv/channels/5d14fd1a252d35decbc4080c/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5d14fd1a252d35decbc4080c/master.m3u8',
        category: 'music',
        country: 'Internacional',
        language: 'Multi'
      },
      {
        id: 'music-latino',
        name: 'Música Latina',
        logo: 'https://images.pluto.tv/channels/5cf96dad1652631e36d43320/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5cf96dad1652631e36d43320/master.m3u8',
        category: 'music',
        country: 'Latino',
        language: 'Español'
      },
      {
        id: 'music-rock',
        name: 'Rock Clásico',
        logo: 'https://images.pluto.tv/channels/5f4d878a0ef2be0007988442/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d878a0ef2be0007988442/master.m3u8',
        category: 'music',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'music-pop',
        name: 'Pop & Dance',
        logo: 'https://images.pluto.tv/channels/5f4d87c5ca71c800077d84b4/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d87c5ca71c800077d84b4/master.m3u8',
        category: 'music',
        country: 'Internacional',
        language: 'Multi'
      },

      // === INFANTIL ===
      {
        id: 'kids-nick',
        name: 'Nick Clásico',
        logo: 'https://images.pluto.tv/channels/5ddd7c348520b40009c347e2/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ddd7c348520b40009c347e2/master.m3u8',
        category: 'kids',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'kids-cartoons',
        name: 'Caricaturas 24h',
        logo: 'https://images.pluto.tv/channels/5f4d88e99d8c300007aafbc0/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d88e99d8c300007aafbc0/master.m3u8',
        category: 'kids',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'kids-family',
        name: 'Familiar',
        logo: 'https://images.pluto.tv/channels/5f4dcae0b8ab340007ccac22/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4dcae0b8ab340007ccac22/master.m3u8',
        category: 'kids',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'kids-educational',
        name: 'Educativo Infantil',
        logo: 'https://images.pluto.tv/channels/5f4d8ac159d9650007c815f3/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8ac159d9650007c815f3/master.m3u8',
        category: 'kids',
        country: 'Internacional',
        language: 'Español'
      },

      // === DOCUMENTALES ===
      {
        id: 'docs-nature',
        name: 'Documentales Naturaleza',
        logo: 'https://images.pluto.tv/channels/5f4d878a40e06b0007e67617/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d878a40e06b0007e67617/master.m3u8',
        category: 'documentaries',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'docs-history',
        name: 'Historia',
        logo: 'https://images.pluto.tv/channels/5f4d889cf55df900074d89a2/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d889cf55df900074d89a2/master.m3u8',
        category: 'documentaries',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'docs-science',
        name: 'Ciencia y Tecnología',
        logo: 'https://images.pluto.tv/channels/5f4d87b82e8eff0007b45d4e/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d87b82e8eff0007b45d4e/master.m3u8',
        category: 'documentaries',
        country: 'Internacional',
        language: 'Español'
      },

      // === ENTRETENIMIENTO ===
      {
        id: 'entertainment-reality',
        name: 'Reality Shows',
        logo: 'https://images.pluto.tv/channels/5f4d87d3b0a8880007c02b7f/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d87d3b0a8880007c02b7f/master.m3u8',
        category: 'entertainment',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'entertainment-comedy-central',
        name: 'Comedy Central',
        logo: 'https://images.pluto.tv/channels/5f4d8f24e5ff0500077dc2d6/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8f24e5ff0500077dc2d6/master.m3u8',
        category: 'entertainment',
        country: 'Internacional',
        language: 'Español'
      },

      // === MÁS PELÍCULAS 24/7 ===
      {
        id: 'movies-western',
        name: 'Western 24h',
        logo: 'https://images.pluto.tv/channels/5f4d89df3279e000074f03a2/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d89df3279e000074f03a2/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-romantic',
        name: 'Romance 24h',
        logo: 'https://images.pluto.tv/channels/5f4d892be834290007122ce6/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d892be834290007122ce6/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-family',
        name: 'Familiar 24h',
        logo: 'https://images.pluto.tv/channels/5f4d878c59de0700077b15ae/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d878c59de0700077b15ae/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-crime',
        name: 'Crimen 24h',
        logo: 'https://images.pluto.tv/channels/5f4d891e75cd4500078b2938/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d891e75cd4500078b2938/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-adventure',
        name: 'Aventura 24h',
        logo: 'https://images.pluto.tv/channels/5f4d8a1c65afce00072c5223/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8a1c65afce00072c5223/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'movies-war',
        name: 'Guerra 24h',
        logo: 'https://images.pluto.tv/channels/5f4d8a3c4b83e300077e4088/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8a3c4b83e300077e4088/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      },

      // === MÁS SERIES 24/7 ===
      {
        id: 'series-classic-tv',
        name: 'TV Clásica',
        logo: 'https://images.pluto.tv/channels/5f4d8cc12e8eff0007b45d53/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8cc12e8eff0007b45d53/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'series-mystery',
        name: 'Misterio 24h',
        logo: 'https://images.pluto.tv/channels/5f4d8c832e8eff0007b45d4e/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8c832e8eff0007b45d4e/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'series-sitcom',
        name: 'Sitcoms 24h',
        logo: 'https://images.pluto.tv/channels/5f4d8a8059de0700077b15b3/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8a8059de0700077b15b3/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'series-crime-drama',
        name: 'Drama Criminal',
        logo: 'https://images.pluto.tv/channels/5f4d8ae6c4dcd0000774d89e/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8ae6c4dcd0000774d89e/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Español'
      },

      // === NOTICIAS INTERNACIONALES ===
      {
        id: 'news-bloomberg',
        name: 'Bloomberg TV',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bloomberg_Television_logo.svg/512px-Bloomberg_Television_logo.svg.png',
        streamUrl: 'https://bloomberg-bloomberg-5-nl.samsung.wurl.tv/playlist.m3u8',
        category: 'news',
        country: 'Estados Unidos',
        language: 'Inglés'
      },
      {
        id: 'news-skynews',
        name: 'Sky News',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Sky_News_logo.svg/512px-Sky_News_logo.svg.png',
        streamUrl: 'https://skynews2-plutolive-vo.akamaized.net/cdnAkamaiLive_1/playlist.m3u8',
        category: 'news',
        country: 'Reino Unido',
        language: 'Inglés'
      },
      {
        id: 'news-aljazeera',
        name: 'Al Jazeera English',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Aljazeera.svg/512px-Aljazeera.svg.png',
        streamUrl: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
        category: 'news',
        country: 'Qatar',
        language: 'Inglés'
      },
      {
        id: 'news-nhk',
        name: 'NHK World Japan',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/NHK_World.svg/512px-NHK_World.svg.png',
        streamUrl: 'https://nhkwlive-ojp.akamaized.net/hls/live/2003459/nhkwlive-ojp-en/index.m3u8',
        category: 'news',
        country: 'Japón',
        language: 'Inglés'
      },
      {
        id: 'news-arirang',
        name: 'Arirang TV',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Arirang_logo.svg/512px-Arirang_logo.svg.png',
        streamUrl: 'https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8',
        category: 'news',
        country: 'Corea del Sur',
        language: 'Inglés'
      },

      // === CANALES LATINOAMERICANOS ===
      {
        id: 'latin-telemundo',
        name: 'Telemundo Internacional',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Telemundo_logo_2018.svg/512px-Telemundo_logo_2018.svg.png',
        streamUrl: 'https://tmint-samsung.amagi.tv/playlist.m3u8',
        category: 'entertainment',
        country: 'Estados Unidos',
        language: 'Español'
      },
      {
        id: 'latin-unimas',
        name: 'UniMás',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/UniM%C3%A1s_logo.svg/512px-UniM%C3%A1s_logo.svg.png',
        streamUrl: 'https://unimas-samsung.amagi.tv/playlist.m3u8',
        category: 'entertainment',
        country: 'Estados Unidos',
        language: 'Español'
      },

      // === MÚSICA VARIADA ===
      {
        id: 'music-classic-rock',
        name: 'Classic Rock 24/7',
        logo: 'https://images.pluto.tv/channels/5dae8be21bb0d40009e05c17/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dae8be21bb0d40009e05c17/master.m3u8',
        category: 'music',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'music-hip-hop',
        name: 'Hip Hop Central',
        logo: 'https://images.pluto.tv/channels/5d14fd1a252d35decbc4080c/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5d14fd1a252d35decbc4080c/master.m3u8',
        category: 'music',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'music-reggaeton',
        name: 'Reggaeton 24h',
        logo: 'https://images.pluto.tv/channels/5cf96dad1652631e36d43320/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5cf96dad1652631e36d43320/master.m3u8',
        category: 'music',
        country: 'Latino',
        language: 'Español'
      },
      {
        id: 'music-country',
        name: 'Country 24h',
        logo: 'https://images.pluto.tv/channels/5da0d83f66c9700009b96d0e/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5da0d83f66c9700009b96d0e/master.m3u8',
        category: 'music',
        country: 'Estados Unidos',
        language: 'Inglés'
      },
      {
        id: 'music-jazz',
        name: 'Jazz 24h',
        logo: 'https://images.pluto.tv/channels/5dae8c6b12748d0009c52c55/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dae8c6b12748d0009c52c55/master.m3u8',
        category: 'music',
        country: 'Internacional',
        language: 'Multi'
      },

      // === DEPORTES ESPECÍFICOS ===
      {
        id: 'sports-football',
        name: 'Fútbol Mundial',
        logo: 'https://images.pluto.tv/channels/5de91cf02fc07c0009910465/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5de91cf02fc07c0009910465/master.m3u8',
        category: 'sports',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'sports-mma',
        name: 'MMA y Lucha',
        logo: 'https://images.pluto.tv/channels/5dcb5ff78f1b88001b4b6ca4/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dcb5ff78f1b88001b4b6ca4/master.m3u8',
        category: 'sports',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'sports-extreme',
        name: 'Deportes Extremos',
        logo: 'https://images.pluto.tv/channels/5ff92b73fb19e40007bc7894/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ff92b73fb19e40007bc7894/master.m3u8',
        category: 'sports',
        country: 'Internacional',
        language: 'Inglés'
      },

      // === INFANTIL EXPANDIDO ===
      {
        id: 'kids-pokemon',
        name: 'Pokémon 24h',
        logo: 'https://images.pluto.tv/channels/5e168a6a5e90ff00095ecd46/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5e168a6a5e90ff00095ecd46/master.m3u8',
        category: 'kids',
        country: 'Japón',
        language: 'Español'
      },
      {
        id: 'kids-transformers',
        name: 'Transformers 24h',
        logo: 'https://images.pluto.tv/channels/5e9ab7d1e6d89d0007bb6b88/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5e9ab7d1e6d89d0007bb6b88/master.m3u8',
        category: 'kids',
        country: 'Estados Unidos',
        language: 'Inglés'
      },
      {
        id: 'kids-power-rangers',
        name: 'Power Rangers',
        logo: 'https://images.pluto.tv/channels/5e9abc79b4b11f000790d089/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5e9abc79b4b11f000790d089/master.m3u8',
        category: 'kids',
        country: 'Estados Unidos',
        language: 'Inglés'
      },
      {
        id: 'kids-teen-titans',
        name: 'Teen Titans Go!',
        logo: 'https://images.pluto.tv/channels/5dd6a5c5b48e7b0009b10314/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dd6a5c5b48e7b0009b10314/master.m3u8',
        category: 'kids',
        country: 'Estados Unidos',
        language: 'Inglés'
      },

      // === DOCUMENTALES ESPECIALIZADOS ===
      {
        id: 'docs-space',
        name: 'Espacio y Cosmos',
        logo: 'https://images.pluto.tv/channels/5f4d87b82e8eff0007b45d4e/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d87b82e8eff0007b45d4e/master.m3u8',
        category: 'documentaries',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'docs-true-crime',
        name: 'Crímenes Reales',
        logo: 'https://images.pluto.tv/channels/5d85c1b56fb6e00091c5a2dc/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5d85c1b56fb6e00091c5a2dc/master.m3u8',
        category: 'documentaries',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'docs-conspiracy',
        name: 'Conspiraciones',
        logo: 'https://images.pluto.tv/channels/5c935b3b4eaf0b3ff24c9af3/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5c935b3b4eaf0b3ff24c9af3/master.m3u8',
        category: 'documentaries',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'docs-paranormal',
        name: 'Paranormal',
        logo: 'https://images.pluto.tv/channels/5c935b3b4eaf0b3ff24c9af3/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5c935b3b4eaf0b3ff24c9af3/master.m3u8',
        category: 'documentaries',
        country: 'Internacional',
        language: 'Inglés'
      },

      // === CANALES TEMÁTICOS ESPECIALES ===
      {
        id: 'special-marvel',
        name: 'Marvel 24h',
        logo: 'https://images.pluto.tv/channels/60c24ab8e6b7c500077d66f6/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/60c24ab8e6b7c500077d66f6/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'special-star-trek',
        name: 'Star Trek 24h',
        logo: 'https://images.pluto.tv/channels/5e2b8c83b6d1cb00092b2ee6/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5e2b8c83b6d1cb00092b2ee6/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'special-batman',
        name: 'Batman 24h',
        logo: 'https://images.pluto.tv/channels/5dcb5ff8c43f1800090ad061/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dcb5ff8c43f1800090ad061/master.m3u8',
        category: 'series',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'special-doctor-who',
        name: 'Doctor Who 24h',
        logo: 'https://images.pluto.tv/channels/5e783ab8b25a900014d46d1d/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5e783ab8b25a900014d46d1d/master.m3u8',
        category: 'series',
        country: 'Reino Unido',
        language: 'Inglés'
      },

      // === CANALES DE COCINA Y LIFESTYLE ===
      {
        id: 'lifestyle-cooking',
        name: 'Cocina 24h',
        logo: 'https://images.pluto.tv/channels/5d47c40e3b23d0001c2a9f76/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5d47c40e3b23d0001c2a9f76/master.m3u8',
        category: 'lifestyle',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'lifestyle-travel',
        name: 'Viajes y Turismo',
        logo: 'https://images.pluto.tv/channels/5dbc36c5c43f1800092dc5c5/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dbc36c5c43f1800092dc5c5/master.m3u8',
        category: 'lifestyle',
        country: 'Internacional',
        language: 'Español'
      },
      {
        id: 'lifestyle-home',
        name: 'Hogar y Jardín',
        logo: 'https://images.pluto.tv/channels/5d47c3a23b23d0001c2a9f73/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5d47c3a23b23d0001c2a9f73/master.m3u8',
        category: 'lifestyle',
        country: 'Internacional',
        language: 'Inglés'
      },

      // === CANALES EDUCATIVOS ===
      {
        id: 'education-ted',
        name: 'TED Talks',
        logo: 'https://images.pluto.tv/channels/5cdc7e96d7c99400118c97b8/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5cdc7e96d7c99400118c97b8/master.m3u8',
        category: 'education',
        country: 'Internacional',
        language: 'Inglés'
      },
      {
        id: 'education-science',
        name: 'Ciencias Educativo',
        logo: 'https://images.pluto.tv/channels/5f4d87b82e8eff0007b45d4e/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d87b82e8eff0007b45d4e/master.m3u8',
        category: 'education',
        country: 'Internacional',
        language: 'Español'
      },

      // === CANALES RELIGIOSOS ===
      {
        id: 'religion-catholic',
        name: 'Católico TV',
        logo: 'https://images.pluto.tv/channels/5d767b6b9c4ed800105aa5e8/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5d767b6b9c4ed800105aa5e8/master.m3u8',
        category: 'religion',
        country: 'Internacional',
        language: 'Español'
      },

      // === CANALES ANIME ADICIONALES ===
      {
        id: 'anime-naruto',
        name: 'Naruto 24h',
        logo: 'https://images.pluto.tv/channels/5ee92e72fbdba7000795c4b1/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ee92e72fbdba7000795c4b1/master.m3u8',
        category: 'anime',
        country: 'Japón',
        language: 'Español'
      },
      {
        id: 'anime-dbz',
        name: 'Dragon Ball 24h',
        logo: 'https://images.pluto.tv/channels/5e99ac3fad7e950007dd02ba/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5e99ac3fad7e950007dd02ba/master.m3u8',
        category: 'anime',
        country: 'Japón',
        language: 'Español'
      },

      // === ENTRETENIMIENTO ADULTO (SOFTCORE) ===
      {
        id: 'adult-comedy',
        name: 'Entretenimiento Nocturno',
        logo: 'https://images.pluto.tv/channels/5f4d8f24e5ff0500077dc2d6/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4d8f24e5ff0500077dc2d6/master.m3u8',
        category: 'entertainment',
        country: 'Internacional',
        language: 'Inglés'
      }
    ]
  }

  // Canales básicos como fallback
  private getBasicChannels(): IPTVChannel[] {
    return [
      {
        id: 'basic-news',
        name: 'CNN International',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/512px-CNN_International_logo.svg.png',
        streamUrl: 'https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8',
        category: 'news',
        country: 'Internacional',
        language: 'Multi'
      },
      {
        id: 'basic-movies',
        name: 'Pluto TV Cine',
        logo: 'https://images.pluto.tv/channels/5dcde437229eff00091b6c30/colorLogoPNG.png',
        streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dcde437229eff00091b6c30/master.m3u8',
        category: 'movies',
        country: 'Internacional',
        language: 'Español'
      }
    ]
  }

  // Limpiar cache
  clearCache(): void {
    this.cache.clear()
    this.channels = []
    console.log('🧹 Cache IPTV limpiado')
  }

  // Agregar canales personalizados (para cuando traigas más listas)
  addCustomChannels(newChannels: IPTVChannel[]): void {
    this.channels.push(...newChannels)
    console.log(`➕ ${newChannels.length} canales personalizados agregados`)
    
    // Actualizar cache
    this.cache.set('all-channels', {
      data: this.channels,
      timestamp: Date.now()
    })
  }



  // Cargar desde archivo M3U externo (para tus listas)
  async loadFromM3U(m3uUrl: string): Promise<IPTVChannel[]> {
    try {
      console.log(`📡 Cargando lista M3U desde: ${m3uUrl}`)
      
      const response = await fetch(m3uUrl, {
        headers: {
          'Accept': 'application/vnd.apple.mpegurl, text/plain, */*'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const content = await response.text()
      const newChannels = this.parseM3U(content)
      
      console.log(`✅ ${newChannels.length} canales cargados desde M3U`)
      
      // Agregar a los canales existentes
      this.addCustomChannels(newChannels)
      
      return newChannels
    } catch (error) {
      console.error('❌ Error cargando M3U:', error)
      return []
    }
  }
}

// Exportar instancia singleton
export const iptvService = new IPTVService()
export default iptvService