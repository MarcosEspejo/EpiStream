'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { IPTVChannel } from '@/services/iptv'

interface IPTVPlayerProps {
  channel: IPTVChannel
  onError?: (error: any) => void
}

const IPTVPlayer: React.FC<IPTVPlayerProps> = ({ channel, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Soporte para HLS si está disponible
  useEffect(() => {
    const video = videoRef.current
    if (!video || !channel) return

    setIsLoading(true)
    setHasError(false)

    // Función para cargar el stream con mejor manejo de errores
    const loadStream = async () => {
      try {
        // Verificar que la URL del stream sea válida
        if (!channel.streamUrl) {
          throw new Error('No stream URL provided')
        }

        // Timeout para el loading
        const loadingTimeout = setTimeout(() => {
          setHasError(true)
          setIsLoading(false)
          onError?.(new Error('Stream loading timeout'))
        }, 10000)

        // Si el navegador soporta HLS nativamente (Safari)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = channel.streamUrl
          clearTimeout(loadingTimeout)
        } else {
          // Cargar HLS.js dinámicamente
          const { default: Hls } = await import('hls.js')
          
          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: false,
              backBufferLength: 15,
              maxBufferLength: 30,
              maxMaxBufferLength: 60,
              startLevel: -1,
              capLevelToPlayerSize: true,
              maxLoadingDelay: 8,
              maxBufferHole: 0.5,
              fragLoadingTimeOut: 20000,
              manifestLoadingTimeOut: 10000,
              levelLoadingTimeOut: 10000
            })
            
            hls.loadSource(channel.streamUrl)
            hls.attachMedia(video)
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log('✅ Stream loaded successfully:', channel.name)
              setIsLoading(false)
              clearTimeout(loadingTimeout)
              video.play().catch(err => {
                console.error('Autoplay failed:', err)
                setIsPlaying(false)
              })
            })
            
            hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
              console.error('❌ HLS Error for', channel.name, ':', data)
              clearTimeout(loadingTimeout)
              
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    console.log('🔄 Trying to recover network error...')
                    hls.startLoad()
                    break
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log('🔄 Trying to recover media error...')
                    hls.recoverMediaError()
                    break
                  default:
                    setHasError(true)
                    setIsLoading(false)
                    onError?.(data)
                    break
                }
              }
            })

            // Cleanup function
            return () => {
              clearTimeout(loadingTimeout)
              hls.destroy()
            }
          } else {
            clearTimeout(loadingTimeout)
            throw new Error('HLS not supported in this browser')
          }
        }
      } catch (error) {
        console.error('❌ Stream loading error for', channel.name, ':', error)
        setHasError(true)
        setIsLoading(false)
        onError?.(error)
      }
    }

    loadStream()
  }, [channel, onError])

  // Event handlers para el video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => setIsLoading(true)
    const handleLoadedData = () => setIsLoading(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
    }

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
    }
  }, [])

  // Controles del reproductor
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current
    if (!video) return

    video.volume = newVolume
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      video.muted = false
      setIsMuted(false)
    }
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Manejar cambios de fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  if (hasError) {
    return (
      <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center">
        <div className="text-center text-gray-300 max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">�</div>
          <h3 className="text-xl font-semibold text-white mb-2">Error de Conexión</h3>
          <p className="text-sm mb-2">No se pudo cargar el canal:</p>
          <p className="text-blue-300 font-medium mb-4">{channel.name}</p>
          
          <div className="text-xs text-gray-400 mb-6 space-y-1">
            <p>• Verifica tu conexión a internet</p>
            <p>• El canal podría estar inactivo</p>
            <p>• Algunos streams tienen restricciones</p>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
                window.location.reload()
              }}
              className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-300 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🔄 Reintentar conexión
            </button>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-gray-600/20 hover:bg-gray-600/30 border border-gray-500/50 text-gray-300 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              ← Volver a la lista
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black rounded-xl"
        autoPlay
        muted={isMuted}
        playsInline
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm">Conectando a {channel.name}...</p>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
        isLoading ? 'pointer-events-none' : ''
      }`}>
        
        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          
          {/* Progress Bar Placeholder (para streams en vivo no aplica) */}
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>EN VIVO</span>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Volume Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              
              {/* Channel Info */}
              <div className="text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                {channel.name}
              </div>
              
              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default IPTVPlayer