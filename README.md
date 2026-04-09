# Woods Portfolio

## Setup rápido

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Editar contenido

Todo el texto del sitio está en un solo archivo:

```
content.js
```

Cambia tu nombre, bio, email, redes, etc. Sin tocar los componentes.

## Agregar imágenes

Pon tus fotos en la carpeta `/public/` y reemplaza los placeholders en `app/page.js`:
- Busca `bg-gradient-to-br` en los `WorkGrid` y reemplaza con `<Image src="/tu-foto.jpg" ...>`
- La foto del hero y about: busca el div con clase `halftone-placeholder`

## Deploy en Vercel

1. Sube este folder a un repo en GitHub
2. Ve a vercel.com → New Project → importa el repo
3. Vercel detecta Next.js automáticamente → Deploy
4. Listo ✓

Cada push al repo actualiza el sitio en automático.
