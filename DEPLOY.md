# EpiStream - Instrucciones de Despliegue

## Opción 1: Netlify (Recomendado como alternativa)

1. Ve a https://netlify.com
2. Crea una cuenta gratuita
3. Click "New site from Git"
4. Conecta con GitHub y selecciona tu repositorio "EpiStream"
5. Configuración:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

## Opción 2: Vercel (Reintento)

1. Elimina el proyecto actual en Vercel
2. Crea nuevo proyecto
3. Importa tu repositorio GitHub "MarcosEspejo/EpiStream"
4. Vercel detectará automáticamente Next.js

## Estado actual:
✅ Build local funciona perfectamente
✅ Código en GitHub actualizado (commit: 58059ee)
✅ Sin errores de TypeScript o ESLint

La URL final será algo como:
- Netlify: https://eloquent-biscuit-123456.netlify.app
- Vercel: https://epi-stream-new.vercel.app