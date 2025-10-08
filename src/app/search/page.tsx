import SearchResults from '@/components/SearchResults'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Buscar - Anónimo',
  description: 'Encuentra tu contenido favorito',
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-1 h-8 bg-white"></div>
          <h1 className="text-3xl font-light text-white">Resultados</h1>
        </div>
        
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin mr-3"></div>
            <span className="text-gray-400">Buscando contenido...</span>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  )
}