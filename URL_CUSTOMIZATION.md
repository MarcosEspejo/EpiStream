# 🔗 Cómo Cambiar y Personalizar la URL de EpiStream

## 📍 URLs ACTUALES vs URLs FINALES

### URL Actual (Desarrollo):
```
http://localhost:3000  (solo tú la ves)
```

### URLs que obtendrás al desplegar:

#### 🚀 VERCEL:
```
Automática: epistream.vercel.app
Personalizada: epistream.com (si compras dominio)
```

#### 🌐 NETLIFY:
```
Automática: epistream.netlify.app  
Personalizada: epistream.com (si compras dominio)
```

---

## ✏️ PERSONALIZAR URL GRATIS

### En Vercel:
1. Después de desplegar obtienes: `random-name-123.vercel.app`
2. Puedes cambiarla a: `epistream.vercel.app`
3. Pasos:
   - Ve a tu proyecto en vercel.com
   - Settings → Domains
   - Cambiar nombre del proyecto

### En Netlify:
1. Después de desplegar obtienes: `random-name-123.netlify.app`
2. Puedes cambiarla a: `epistream.netlify.app`
3. Pasos:
   - Site Settings → Change site name
   - Escribir: `epistream`

---

## 🌐 DOMINIO COMPLETAMENTE PERSONALIZADO

### Para tener: `epistream.com` o `peliculasgratis.com`
1. **Comprar dominio** (~$10-15/año):
   - Namecheap, GoDaddy, CloudFlare
   - Ejemplos: `epistream.com`, `cinestream.net`, `movieshub.tv`

2. **Conectarlo gratis**:
   - Vercel y Netlify permiten dominios personalizados gratis
   - Solo pagas el dominio, no el hosting

---

## 🎯 RECOMENDACIONES DE NOMBRES CORTOS

### URLs Gratis (con subdominios):
- `epistream.vercel.app`
- `cinestream.netlify.app`
- `movieshub.vercel.app`

### Dominios para comprar:
- `epistream.com`
- `cinestream.net` 
- `movieshub.tv`
- `streamhub.app`

---

## ⚡ CONFIGURAR AHORA

### Para cambiar el nombre del proyecto:
1. Ir a `package.json`
2. Cambiar `"name": "epistream"` por el nombre que quieras
3. Al desplegar, usará ese nombre para la URL

¿Qué nombre corto prefieres para tu URL?