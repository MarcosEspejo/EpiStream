import Hero from '@/components/Hero'
import MovieGrid from '@/components/MovieGrid'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">Películas Populares</h2>
        <MovieGrid type="popular" />
      </section>
      
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">Series Populares</h2>
        <MovieGrid type="tv" />
      </section>
    </main>
  )
}