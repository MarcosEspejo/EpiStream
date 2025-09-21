'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            EpiStream
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
              Inicio
            </Link>
            <Link href="/movies" className="text-white hover:text-blue-400 transition-colors">
              Películas
            </Link>
            <Link href="/series" className="text-white hover:text-blue-400 transition-colors">
              Series
            </Link>
            <Link href="/search" className="text-white hover:text-blue-400 transition-colors">
              🔍
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 transition-colors text-xl"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                href="/" 
                className="block text-white hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/movies" 
                className="block text-white hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Películas
              </Link>
              <Link 
                href="/series" 
                className="block text-white hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Series
              </Link>
              <Link 
                href="/search" 
                className="block text-white hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Buscar
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}