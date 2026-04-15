/**
 * optimize-images.mjs
 * - Renombra archivos con nombres irregulares → 1.jpg, 2.jpg, ...
 * - Convierte .PNG / .png → .jpg
 * - Comprime todo a JPG quality 85, max 1600px de ancho
 * - Salida: D:\woods-portfolio\public\trabajo\{proyecto}\{carpeta}\{n}.jpg
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const SRC_BASE  = 'D:/Descargas/Mi trabajo'
const DEST_BASE = 'D:/woods-portfolio/public/trabajo'

const PROJECTS = [
  'Biking Village',
  'Coldness',
  'Coopsominas',
  'Elena rubtso',
  'Isabela Londoño',
  'Jicara',
  'La competencia',
  'Swear.art',
  'Truzt',
  'Valentina Ramirez',
]

// Slug para la carpeta de destino
function slug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[áà]/g, 'a').replace(/[é]/g, 'e')
    .replace(/[í]/g, 'i').replace(/[ó]/g, 'o')
    .replace(/[ú]/g, 'u').replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9-]/g, '')
}

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp']

function isImage(file) {
  return IMAGE_EXTS.includes(path.extname(file).toLowerCase())
}

let totalIn = 0, totalOut = 0

for (const project of PROJECTS) {
  const srcProject = path.join(SRC_BASE, project)
  const destProject = path.join(DEST_BASE, slug(project))

  if (!fs.existsSync(srcProject)) {
    console.log(`⚠️  No encontrado: ${project}`)
    continue
  }

  const folders = fs.readdirSync(srcProject)
    .filter(f => fs.statSync(path.join(srcProject, f)).isDirectory())
    .sort((a, b) => Number(a) - Number(b))

  for (const folder of folders) {
    const srcFolder  = path.join(srcProject, folder)
    const destFolder = path.join(destProject, folder)
    fs.mkdirSync(destFolder, { recursive: true })

    const files = fs.readdirSync(srcFolder)
      .filter(isImage)
      .sort() // orden alfabético/numérico

    let idx = 1
    for (const file of files) {
      const srcFile  = path.join(srcFolder, file)
      const destFile = path.join(destFolder, `${idx}.jpg`)

      const statIn = fs.statSync(srcFile)
      totalIn += statIn.size

      try {
        await sharp(srcFile)
          .resize({ width: 1600, withoutEnlargement: true })
          .jpeg({ quality: 85, mozjpeg: true })
          .toFile(destFile)

        const statOut = fs.statSync(destFile)
        totalOut += statOut.size

        const kbIn  = Math.round(statIn.size  / 1024)
        const kbOut = Math.round(statOut.size / 1024)
        const pct   = Math.round((1 - statOut.size / statIn.size) * 100)
        console.log(`  ✓ ${project}/${folder}/${file} → ${idx}.jpg  ${kbIn}KB → ${kbOut}KB (${pct}% menos)`)
      } catch (err) {
        console.error(`  ✗ Error: ${srcFile}`, err.message)
      }

      idx++
    }
  }
}

const mbIn  = (totalIn  / 1024 / 1024).toFixed(1)
const mbOut = (totalOut / 1024 / 1024).toFixed(1)
const saved = Math.round((1 - totalOut / totalIn) * 100)
console.log(`\n✅ Total: ${mbIn}MB → ${mbOut}MB (${saved}% ahorrado)`)
