'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import IPTVPlayer from '@/components/IPTVPlayer'
import UniversalPlayer from '@/components/UniversalPlayer'
import ChannelList from '@/components/ChannelList'
import { iptvService } from '@/services/iptv'
import type { IPTVChannel } from '@/services/iptv'

// export const metadata: Metadata = {
//   title: 'TV en Vivo - Anónimo',
//   description: 'Disfruta de televisión en vivo con canales de todo el mundo',
// }

export default function LiveTVPage() {
  const [channels, setChannels] = useState<IPTVChannel[]>([])
  const [selectedChannel, setSelectedChannel] = useState<IPTVChannel | null>(null)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('all')

  useEffect(() => {
    const loadChannels = async () => {
      try {
        setLoading(true)
        const channelList = await iptvService.getChannels()
        setChannels(channelList)
        if (channelList.length > 0) {
          setSelectedChannel(channelList[0])
        }
      } catch (error) {
        console.error('Error loading channels:', error)
      } finally {
        setLoading(false)
      }
    }

    loadChannels()
  }, [])

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'news', name: 'Noticias' },
    { id: 'movies', name: 'Películas' },
    { id: 'series', name: 'Series' },
    { id: 'anime', name: 'Anime' },
    { id: 'sports', name: 'Deportes' },
    { id: 'music', name: 'Música' },
    { id: 'kids', name: 'Infantil' },
    { id: 'documentaries', name: 'Documentales' },
    { id: 'entertainment', name: 'Entretenimiento' },
    { id: 'lifestyle', name: 'Estilo de Vida' },
    { id: 'education', name: 'Educativo' },
  ]

  const filteredChannels = category === 'all' 
    ? channels 
    : channels.filter(channel => channel.category === category)

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Cargando canales...</div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section - Diseño Anónimo */}
      <div className="relative bg-gradient-to-b from-black via-gray-900/20 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium tracking-wider">EN VIVO</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                TV en Vivo
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Disfruta de <span className="text-red-500 font-bold">{channels.length}+ canales</span> de televisión en tiempo real.
                <br />
                Noticias, deportes, películas, series, anime, música y más desde todo el mundo.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">📰 Noticias Mundiales</span>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">🎬 Películas 24h</span>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">📺 Series & Anime</span>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">⚽ Deportes</span>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">🎵 Música</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Panel Izquierdo - Lista de Canales */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              
              {/* Filtros de Categoría */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Categorías</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        category === cat.id
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de Canales */}
              <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Canales ({filteredChannels.length})
                  </h3>
                </div>
                <ChannelList
                  channels={filteredChannels}
                  selectedChannel={selectedChannel}
                  onChannelSelect={setSelectedChannel}
                />
              </div>
            </div>
          </div>

          {/* Panel Principal - Reproductor */}
          <div className="flex-1">
            {selectedChannel ? (
              <div className="space-y-6">
                {/* Información del Canal */}
                <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedChannel.logo}
                        alt={selectedChannel.name}
                        className="w-12 h-12 rounded-lg border border-white/20"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                          {selectedChannel.name}
                        </h2>
                        <p className="text-gray-400 text-sm capitalize">
                          {selectedChannel.category} • {selectedChannel.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-red-500/20 border border-red-500/30 px-3 py-2 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400 text-sm font-medium">EN VIVO</span>
                    </div>
                  </div>
                </div>

                {/* Reproductor */}
                <div className="bg-black rounded-2xl overflow-hidden border border-white/10">
                  <UniversalPlayer
                    channel={selectedChannel}
                    onError={(error) => console.error('Player error:', error)}
                  />
                </div>

                {/* Información Adicional */}
                <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1 h-6 bg-white rounded-full"></div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Información</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                    <div>
                      <span className="text-white font-medium">País:</span> {selectedChannel.country}
                    </div>
                    <div>
                      <span className="text-white font-medium">Idioma:</span> {selectedChannel.language || 'N/A'}
                    </div>
                    <div>
                      <span className="text-white font-medium">Calidad:</span> HD
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                <div className="text-gray-400 text-lg">
                  Selecciona un canal para comenzar a ver TV en vivo
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </main>
  )
}