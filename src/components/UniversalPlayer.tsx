'use client'

import React, { useState } from 'react'
import type { IPTVChannel } from '@/services/iptv'
import IPTVPlayer from './IPTVPlayer'

interface UniversalPlayerProps {
  channel: IPTVChannel
  onError?: (error: any) => void
}

const UniversalPlayer: React.FC<UniversalPlayerProps> = ({ channel, onError }) => {
  const [hasError, setHasError] = useState(false)

  const handleError = (error: any) => {
    setHasError(true)
    onError?.(error)
  }

  // Para streams embebidos de YouTube
  if (channel.isEmbedded) {
    return (
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          src={channel.streamUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={channel.name}
          onError={() => handleError(new Error('Failed to load embedded stream'))}
        />
      </div>
    )
  }

  // Para videos MP4 directos
  if (channel.isVideo) {
    return (
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        <video
          className="w-full h-full"
          controls
          autoPlay
          preload="metadata"
          poster="/tv-placeholder.png"
          onError={() => handleError(new Error('Failed to load video'))}
        >
          <source src={channel.streamUrl} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    )
  }

  // Para streams HLS tradicionales
  return (
    <IPTVPlayer 
      channel={channel} 
      onError={handleError}
    />
  )
}

export default UniversalPlayer