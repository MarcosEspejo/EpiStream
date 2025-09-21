import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">EpiStream</h3>
            <p className="text-gray-400 mb-4">
              Tu destino para descubrir las mejores películas y series. 
              Explora contenido de calidad y mantente al día con los últimos estrenos.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-white transition-colors">
                  Películas
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-gray-400 hover:text-white transition-colors">
                  Series
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white transition-colors">
                  Buscar
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Datos proporcionados por</span>
              </li>
              <li>
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  The Movie Database (TMDB)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 EpiStream. Desarrollado con Next.js y desplegado en Vercel.
          </p>
        </div>
      </div>
    </footer>
  )
}

          {/* Información */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Datos proporcionados por</span>
              </li>
              <li>
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  The Movie Database (TMDB)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 EpiStream. Desarrollado con Next.js y desplegado en Vercel.
          </p>
        </div>
      </div>
    </footer>
  )
}