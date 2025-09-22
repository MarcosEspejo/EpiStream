# 📁 ESTRUCTURA COMPLETA DE VISTAS - EpiStream

## 🏠 PÁGINAS PRINCIPALES (src/app/)

### 1. **PÁGINA DE INICIO** - `src/app/page.tsx`
```
URL: https://epistream.vercel.app/
Contiene: Hero banner + Películas populares + Series populares
Componentes: Hero, MovieGrid, SeriesGrid
```

### 2. **PÁGINA DE PELÍCULAS** - `src/app/movies/page.tsx`
```
URL: https://epistream.vercel.app/movies
Contiene: Grid completo de películas
Componentes: MovieGrid
```

### 3. **PÁGINA DE SERIES** - `src/app/series/page.tsx`
```
URL: https://epistream.vercel.app/series
Contiene: Grid completo de series
Componentes: SeriesGrid
```

### 4. **PÁGINA DE BÚSQUEDA** - `src/app/search/page.tsx`
```
URL: https://epistream.vercel.app/search
Contiene: Buscador + Resultados filtrados
Componentes: SearchResults
```

### 5. **LAYOUT PRINCIPAL** - `src/app/layout.tsx`
```
Contiene: Estructura base (Navbar + contenido + Footer)
Se aplica a: TODAS las páginas
Componentes: Navbar, Footer
```

---

## 🧩 COMPONENTES REUTILIZABLES (src/components/)

### **NAVEGACIÓN Y ESTRUCTURA:**
- **`Navbar.tsx`** - Menú superior con logo y navegación
- **`Footer.tsx`** - Pie de página con enlaces y créditos

### **CONTENIDO PRINCIPAL:**
- **`Hero.tsx`** - Banner principal de la página de inicio
- **`MovieGrid.tsx`** - Cuadrícula de películas (tarjetas)
- **`SeriesGrid.tsx`** - Cuadrícula de series (tarjetas)
- **`SearchResults.tsx`** - Resultados de búsqueda

---

## 🎨 ARCHIVOS DE ESTILOS Y CONFIG

### **ESTILOS:**
- **`src/app/globals.css`** - Estilos globales de Tailwind
- **`tailwind.config.js`** - Configuración de Tailwind CSS

### **CONFIGURACIÓN:**
- **`next.config.js`** - Configuración de Next.js
- **`tsconfig.json`** - Configuración de TypeScript

---

## 📊 TIPOS Y DATOS

### **TIPOS:**
- **`src/types/index.ts`** - Definiciones de tipos (Movie, Series, etc.)

---

## 🔍 RESUMEN POR UBICACIÓN

### PÁGINAS QUE VE EL USUARIO:
1. **Inicio** → `src/app/page.tsx`
2. **Películas** → `src/app/movies/page.tsx`
3. **Series** → `src/app/series/page.tsx`
4. **Búsqueda** → `src/app/search/page.tsx`

### COMPONENTES PARA MEJORAR:
1. **Navbar** → `src/components/Navbar.tsx`
2. **Hero Banner** → `src/components/Hero.tsx`
3. **Tarjetas de Películas** → `src/components/MovieGrid.tsx`
4. **Tarjetas de Series** → `src/components/SeriesGrid.tsx`
5. **Buscador** → `src/components/SearchResults.tsx`
6. **Footer** → `src/components/Footer.tsx`

## ❓ ¿QUÉ QUIERES MEJORAR PRIMERO?

**Opciones populares:**
- 🎨 **Hero Banner** (más atractivo)
- 🎬 **Tarjetas de películas/series** (mejor diseño)
- 🔍 **Buscador** (más funcional)
- 📱 **Navbar** (más responsive)
- 🌟 **Página de inicio** (más contenido)