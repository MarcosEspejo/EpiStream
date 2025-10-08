'use client'

import React from 'react'
import type { IPTVChannel } from '@/services/iptv'

interface ChannelListProps {
  channels: IPTVChannel[]
  selectedChannel: IPTVChannel | null
  onChannelSelect: (channel: IPTVChannel) => void
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  selectedChannel,
  onChannelSelect
}) => {
  // Categorías con iconos
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'news':
        return '📰'
      case 'sports':
        return '⚽'
      case 'entertainment':
        return '🎭'
      case 'movies':
        return '🎬'
      case 'music':
        return '🎵'
      case 'kids':
        return '🧸'
      case 'series':
        return '📺'
      case 'anime':
        return '🈲'
      case 'documentaries':
        return '📖'
      case 'lifestyle':
        return '🏠'
      case 'education':
        return '🎓'
      case 'religion':
        return '⛪'
      default:
        return '📺'
    }
  }

  // Traducir categorías
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      'news': 'Noticias',
      'sports': 'Deportes', 
      'entertainment': 'Entretenimiento',
      'movies': 'Películas',
      'music': 'Música',
      'kids': 'Infantil',
      'series': 'Series',
      'anime': 'Anime',
      'documentaries': 'Documentales',
      'lifestyle': 'Estilo de Vida',
      'education': 'Educativo',
      'religion': 'Religioso',
      'general': 'General'
    }
    return translations[category.toLowerCase()] || category
  }

  return (
    <div className="space-y-1">
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => onChannelSelect(channel)}
          className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group ${
            selectedChannel?.id === channel.id
              ? 'bg-white text-black shadow-lg transform scale-[1.02]'
              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
          }`}
        >
          {/* Logo del Canal */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-10 h-10 rounded-lg object-cover border border-white/20"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/placeholder-tv.png'
                }}
              />
              {/* Indicador de categoría */}
              <div className="absolute -top-1 -right-1 text-xs">
                {getCategoryIcon(channel.category)}
              </div>
            </div>
          </div>

          {/* Información del Canal */}
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-sm truncate ${
                selectedChannel?.id === channel.id ? 'text-black' : 'text-white'
              }`}>
                {channel.name}
              </h4>
              {/* Indicador en vivo */}
              <div className="flex items-center space-x-1 ml-2">
                <div className={`w-2 h-2 rounded-full ${
                  selectedChannel?.id === channel.id ? 'bg-red-600' : 'bg-red-500'
                } animate-pulse`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs ${
                selectedChannel?.id === channel.id ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {translateCategory(channel.category)}
              </span>
              <span className={`text-xs ${
                selectedChannel?.id === channel.id ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {channel.country}
              </span>
            </div>
          </div>

          {/* Flecha de selección */}
          <div className={`flex-shrink-0 transition-all duration-300 ${
            selectedChannel?.id === channel.id 
              ? 'transform rotate-90 text-black' 
              : 'text-gray-500 group-hover:text-white'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}

      {/* Mensaje cuando no hay canales */}
      {channels.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">📺</div>
          <p className="text-sm">No hay canales disponibles</p>
          <p className="text-xs mt-1">Intenta con otra categoría</p>
        </div>
      )}
    </div>
  )
}

export default ChannelList