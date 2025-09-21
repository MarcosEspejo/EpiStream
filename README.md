# EpiStream 🎬

Una aplicación web moderna para explorar películas y series, construida con Next.js, React y Tailwind CSS.

✅ **Desplegado en Vercel** - Acceso global disponible
🚀 **Build Version:** v1.0.1

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Navegación Intuitiva**: Menú de navegación moderno con versión móvil
- **Catálogo de Contenido**: Secciones dedicadas para películas y series
- **Funcionalidad de Búsqueda**: Encuentra tu contenido favorito fácilmente
- **Interfaz Moderna**: Diseñada con Tailwind CSS para una experiencia visual atractiva
- **Performance Optimizada**: Construida con Next.js para carga rápida y SEO

## 🛠️ Tecnologías Utilizadas

- **Next.js 14+** - Framework de React para aplicaciones web
- **React 18+** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Vercel** - Plataforma de despliegue

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/epistream.git
cd epistream
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Crea la build de producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter para revisar el código

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Página de inicio
│   ├── movies/           # Páginas de películas
│   ├── series/           # Páginas de series
│   └── search/           # Página de búsqueda
├── components/            # Componentes reutilizables
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MovieGrid.tsx
│   ├── SeriesGrid.tsx
│   └── SearchResults.tsx
├── types/                 # Definiciones de tipos TypeScript
└── lib/                   # Utilidades y configuraciones
```

## 🎨 Funcionalidades

### Páginas Principales
- **Inicio**: Hero section con acceso rápido y contenido destacado
- **Películas**: Catálogo organizado por popularidad, mejor valoradas y próximamente
- **Series**: Colección de series populares, mejor valoradas y al aire
- **Búsqueda**: Sistema de búsqueda unificado para películas y series

### Componentes
- **Navbar**: Navegación responsiva con menú móvil
- **Hero**: Sección principal con llamadas a la acción
- **MovieGrid/SeriesGrid**: Grillas de contenido con información detallada
- **SearchResults**: Resultados de búsqueda con filtros
- **Footer**: Información adicional y enlaces

## 🌐 Despliegue en Vercel

Esta aplicación está optimizada para desplegarse en Vercel:

1. Conecta tu repositorio a Vercel
2. La configuración se detectará automáticamente
3. Los despliegues se realizarán automáticamente en cada push

### Variables de Entorno (Opcional)

Para funcionalidad completa con datos reales, puedes agregar:

```env
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_de_tmdb
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- Desarrollado con ❤️ usando Next.js
- Desplegado en Vercel
- Datos de películas y series pueden integrarse con [The Movie Database (TMDB)](https://www.themoviedb.org/)