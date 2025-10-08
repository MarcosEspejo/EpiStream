import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-white rounded flex items-center justify-center">
                <span className="text-white text-lg font-bold">A</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Anónimo</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Plataforma de streaming minimalista. Descubre contenido cinematográfico 
              de calidad en una experiencia elegante y sin distracciones.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navegación</h4>
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
                  Búsqueda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 text-sm">Datos cinematográficos</span>
              </li>
              <li>
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors text-sm"
                >
                  The Movie Database
                </a>
              </li>
              <li className="pt-2">
                <span className="text-gray-500 text-xs">Tecnología</span>
              </li>
              <li>
                <span className="text-white text-sm">Next.js • Vercel</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-6 h-6 border border-white/70 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Anónimo. Experiencia cinematográfica minimalista.
            </p>
          </div>
          <div className="text-gray-500 text-xs">
            <span>Desarrollado con pasión • Desplegado globalmente</span>
          </div>
        </div>
      </div>
    </footer>
  )
}