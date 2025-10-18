'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function StreamingOptionsPage() {
  const [selectedOption, setSelectedOption] = useState<string>('')

  const streamOptions = [
    {
      id: 'embedded',
      title: '📺 Streams Embebidos (YouTube)',
      description: 'La opción más confiable. Usa canales oficiales de YouTube que siempre funcionan.',
      pros: [
        '✅ Máxima compatibilidad',
        '✅ Funciona en todos los dispositivos',
        '✅ Sin problemas de CORS',
        '✅ Calidad garantizada'
      ],
      cons: [
        '❌ Menos canales disponibles',
        '❌ Depende de YouTube'
      ],
      recommended: true
    },
    {
      id: 'demo',
      title: '🎬 Videos de Demostración',
      description: 'Videos MP4 directos sin problemas de streaming. Ideal para testing.',
      pros: [
        '✅ Carga instantánea',
        '✅ Sin buffering',
        '✅ Funciona siempre',
        '✅ Sin restricciones'
      ],
      cons: [
        '❌ Contenido limitado',
        '❌ No es contenido en vivo'
      ]
    },
    {
      id: 'iptv',
      title: '📡 IPTV Tradicional',
      description: 'Streams M3U8/HLS reales. Puede tener problemas de conectividad.',
      pros: [
        '✅ Muchos canales',
        '✅ Contenido en vivo real',
        '✅ Variedad internacional'
      ],
      cons: [
        '❌ Problemas de CORS',
        '❌ Streams inestables',
        '❌ Geo-restricciones',
        '❌ Puede fallar frecuentemente'
      ]
    },
    {
      id: 'proxy',
      title: '🔄 Proxy Server (Solución Técnica)',
      description: 'Implementar un servidor proxy para solucionar problemas de CORS.',
      pros: [
        '✅ Soluciona problemas de CORS',
        '✅ Acceso a más streams',
        '✅ Control total'
      ],
      cons: [
        '❌ Requiere servidor adicional',
        '❌ Más complejo de mantener',
        '❌ Costos adicionales'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-black/20 to-transparent backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Opciones de Streaming
              </h1>
              <p className="text-gray-400 mt-2">
                Elige la mejor opción para tu conexión y dispositivo
              </p>
            </div>
            <Link 
              href="/live-tv"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← Volver a TV
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {streamOptions.map((option) => (
            <div
              key={option.id}
              className={`relative bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                option.recommended 
                  ? 'border-green-500/50 shadow-lg shadow-green-500/20' 
                  : 'border-white/10'
              } ${
                selectedOption === option.id 
                  ? 'ring-2 ring-blue-500 border-blue-500/50' 
                  : ''
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.recommended && (
                <div className="absolute -top-3 left-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  🏆 Recomendado
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {option.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-green-400 font-medium mb-2">Ventajas:</h4>
                  <ul className="space-y-1">
                    {option.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-gray-300">
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-red-400 font-medium mb-2">Desventajas:</h4>
                  <ul className="space-y-1">
                    {option.cons.map((con, index) => (
                      <li key={index} className="text-sm text-gray-300">
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedOption === option.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    Aplicar esta configuración
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Guía de Solución */}
        <div className="mt-12 bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            🛠️ Guía de Solución de Problemas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-400">Para Móviles</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Usa streams embebidos de YouTube</li>
                <li>• Evita IPTV tradicional</li>
                <li>• Verifica tu conexión 4G/WiFi</li>
                <li>• Usa Chrome o Safari</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-400">Para PC/Laptop</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Chrome funciona mejor</li>
                <li>• Instala extensiones anti-CORS</li>
                <li>• Videos demo siempre funcionan</li>
                <li>• Considera proxy server</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-400">Para Smart TV</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Usar navegador integrado</li>
                <li>• Streams embebidos son ideales</li>
                <li>• Evitar IPTV complejo</li>
                <li>• Verificar capacidades HLS</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h4 className="text-yellow-400 font-medium mb-2">💡 Recomendación Actual:</h4>
            <p className="text-gray-300 text-sm">
              Basándome en tus problemas de conectividad, te recomiendo usar <strong>Streams Embebidos de YouTube</strong>. 
              Son los más estables y funcionan en todos los dispositivos sin problemas de CORS ni geo-restricciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}