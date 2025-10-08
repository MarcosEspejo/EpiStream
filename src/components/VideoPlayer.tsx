'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { contentService } from '@/services/content'

interface VideoPlayerProps {
  title: string
  movieId: number
  sources?: string[]
  poster?: string
  type?: 'movie' | 'series'
}

export default function VideoPlayer({ title, movieId, sources = [], poster, type = 'movie' }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSource, setCurrentSource] = useState<string | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Cargar fuente de contenido real
  useEffect(() => {
    const loadContent = async () => {
      try {
        const contentSource = type === 'movie' 
          ? await contentService.getMovieStream(movieId)
          : await contentService.getSeriesStream(movieId)
        
        if (contentSource) {
          setCurrentSource(contentSource.url)
        }
      } catch (error) {
        console.error('Error loading content:', error)
        // Fallback a fuentes demo
        setCurrentSource('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
      }
    }

    if (sources.length === 0) {
      loadContent()
    } else {
      setCurrentSource(sources[0])
    }
  }, [movieId, sources, type])

  // Auto-hide controls
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      setShowControls(true)
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    resetControlsTimeout()
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setIsLoading(false)
      console.log('✅ Video cargado correctamente')
    }
  }

  const handleError = (e: any) => {
    console.error('❌ Error al cargar el video:', e)
    setIsLoading(false)
    setHasError(true)
    // En caso de error, intentar con contenido alternativo
    if (currentSource?.includes('archive.org')) {
      console.log('🔄 Intentando con video demo alternativo...')
      setCurrentSource('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
      setHasError(false)
      setIsLoading(true)
    }
  }

  const handleCanPlay = () => {
    setIsLoading(false)
    setHasError(false)
    console.log('✅ Video listo para reproducir')
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (videoRef.current) {
      videoRef.current.volume = vol
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const goBack = () => {
    const path = type === 'movie' ? `/movies/${movieId}` : `/series/${movieId}`
    router.push(path)
  }

  if (!currentSource) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando contenido...</div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen bg-black ${showControls ? '' : 'cursor-none'}`}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        src={currentSource}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        crossOrigin="anonymous"
        preload="metadata"
      >
        Tu navegador no soporta el elemento video.
      </video>

      {/* Error Overlay */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-white text-xl mb-4">Error al cargar el contenido</div>
          <div className="text-gray-400 text-center mb-6">
            <p>No se pudo reproducir este contenido en este momento</p>
            <p className="text-sm mt-2">Intenta refrescar la página o selecciona otro contenido</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Reintentar
            </button>
            <button
              onClick={goBack}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors font-medium"
            >
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-600 border-t-white mb-4"></div>
          <div className="text-white text-xl mb-2">Cargando contenido...</div>
          <div className="text-gray-400 text-sm">Esto puede tomar unos segundos</div>
        </div>
      )}

      {/* Content Info */}
      <div className="absolute top-4 left-4 right-4 z-50">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold text-lg">{title}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="bg-white/20 px-2 py-1 rounded text-white text-xs font-medium border border-white/30">HD</span>
                <span className="text-gray-300 text-sm">Streaming</span>
              </div>
            </div>
            {/* Logo Anónimo discreto */}
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-6 h-6 border border-white/50 rounded flex items-center justify-center text-xs font-bold">
                A
              </div>
              <span className="text-sm font-medium">Anónimo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-black transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <div className="flex items-center gap-3 text-white/80">
            <div className="w-8 h-8 border border-white/50 rounded flex items-center justify-center text-sm font-bold">
              A
            </div>
            <span className="text-lg font-medium">Anónimo</span>
          </div>
          <div></div>
        </div>

        {/* Center Play Button */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all border border-white/30"
            >
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer progress-slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button onClick={togglePlay} className="text-white hover:text-gray-300">
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer volume-slider"
                />
              </div>

              {/* Time */}
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .progress-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #000;
        }
        .progress-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #000;
        }
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #000;
        }
        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #000;
        }
        .progress-slider::-webkit-slider-track {
          background: #374151;
          height: 6px;
          border-radius: 3px;
        }
        .volume-slider::-webkit-slider-track {
          background: #374151;
          height: 6px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}