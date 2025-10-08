# 📺 Guía para Agregar Más Canales IPTV - EpiStream

## 🎯 Métodos para Expandir Canales

### 1. 📋 Agregar Canales Manualmente

Edita `src/services/iptv.ts` en la función `getDemoChannels()`:

```typescript
{
  id: 'tu-canal-id',
  name: 'Nombre del Canal',
  logo: 'https://url-del-logo.png',
  streamUrl: 'https://stream-url.m3u8',
  category: 'movies', // movies, series, news, sports, music, kids, documentaries, entertainment
  country: 'País',
  language: 'Idioma'
}
```

### 2. 🔗 Cargar desde Listas M3U

```typescript
// En cualquier parte de tu código
await iptvService.loadFromM3U('https://tu-lista.m3u8')
```

### 3. 📁 Cargar Múltiples Listas

```typescript
const listas = [
  'https://lista1.m3u8',
  'https://lista2.m3u8',
  'https://lista3.m3u8'
]

for (const lista of listas) {
  await iptvService.loadFromM3U(lista)
}
```

## 🗂️ Categorías Disponibles

- `news` - Noticias
- `movies` - Películas
- `series` - Series
- `sports` - Deportes
- `music` - Música
- `kids` - Infantil
- `documentaries` - Documentales
- `entertainment` - Entretenimiento

## 🌐 Fuentes de Listas M3U Públicas

### 📡 IPTV-org (GitHub)
```
https://iptv-org.github.io/iptv/countries/es.m3u
https://iptv-org.github.io/iptv/countries/mx.m3u
https://iptv-org.github.io/iptv/countries/ar.m3u
```

### 📺 Por Categorías
```
https://iptv-org.github.io/iptv/categories/news.m3u
https://iptv-org.github.io/iptv/categories/movies.m3u
https://iptv-org.github.io/iptv/categories/sports.m3u
```

## 🔧 Ejemplo Práctico

### Agregar Canal de Noticias:

```typescript
{
  id: 'cnn-espanol',
  name: 'CNN en Español',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNN_en_Espa%C3%B1ol_logo.svg/512px-CNN_en_Espa%C3%B1ol_logo.svg.png',
  streamUrl: 'https://cnn-cnnespanol-1-eu.rakuten.wurl.tv/playlist.m3u8',
  category: 'news',
  country: 'Estados Unidos',
  language: 'Español'
}
```

### Agregar Canal de Películas 24h:

```typescript
{
  id: 'cine-terror',
  name: 'Terror 24h',
  logo: 'https://images.pluto.tv/channels/5f4dcbb0cd8ade00077dc2d2/colorLogoPNG.png',
  streamUrl: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f4dcbb0cd8ade00077dc2d2/master.m3u8',
  category: 'movies',
  country: 'Internacional',
  language: 'Español'
}
```

## 🧪 Validar Streams

```typescript
// Validar si un stream funciona
const funciona = await iptvService.validateStream('https://stream-url.m3u8')
console.log(funciona ? '✅ Stream válido' : '❌ Stream no funciona')
```

## 🔄 Limpiar Cache

```typescript
// Limpiar cache cuando agregues canales
iptvService.clearCache()
```

## 📝 Formato M3U Básico

```m3u
#EXTM3U
#EXTINF:-1 tvg-logo="https://logo.png" group-title="Películas",Mi Canal
https://stream-url.m3u8
```

## 🎨 Obtener Logos

### Fuentes Recomendadas:
- **Wikipedia Commons**: Logos oficiales en alta calidad
- **Pluto TV**: `https://images.pluto.tv/channels/[CHANNEL_ID]/colorLogoPNG.png`
- **GitHub IPTV**: Repositorios con logos organizados

### Ejemplo de URLs de Logos:
```
https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/512px-CNN_International_logo.svg.png
https://images.pluto.tv/channels/5dcde437229eff00091b6c30/colorLogoPNG.png
```

## ⚡ Optimización de Rendimiento

### Cache Inteligente
- Los canales se cachean por 10 minutos
- Validación automática de streams
- Fallbacks rápidos

### Streams Recomendados
- **HLS (.m3u8)**: Mejor compatibilidad
- **Resolución adaptativa**: Automática
- **Latencia baja**: < 10 segundos

## 🔍 Encontrar Más Streams

### Herramientas Útiles:
1. **IPTV-org**: Mayor base de datos pública
2. **Pluto TV**: Streams legales 24/7
3. **Samsung TV Plus**: Canales gratuitos
4. **Tubi**: Películas gratis con ads

### Verificar Legalidad:
- Usar solo streams públicos y legales
- Verificar términos de uso
- Preferir contenido con licencia abierta

## 🚀 Deployment con Nuevos Canales

```bash
# Después de agregar canales
npm run build
vercel --prod
```

## 🔒 Consideraciones de Privacidad

- Streams directos (sin proxies)
- CDN para distribución global
- No logging de IPs de usuarios
- Rotación de dominios recomendada

---

💡 **Tip**: Agrega 5-10 canales a la vez y prueba que funcionen antes de agregar más.

🚀 **Recuerda**: Después de agregar canales, reinicia el servidor para ver los cambios.