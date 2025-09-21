import SearchResults from '@/components/SearchResults'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar - EpiStream',
  description: 'Busca tus películas y series favoritas',
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Buscar</h1>
        <SearchResults />
      </div>
    </main>
  )
}