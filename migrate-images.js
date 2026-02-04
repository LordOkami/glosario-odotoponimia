import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEW_IMAGES_DIR = path.join(__dirname, 'NEW_IMAGES');
const TARGET_DIR = path.join(__dirname, 'assets', 'img');
const GLOSARIO_PATH = path.join(__dirname, 'data', 'glosario.json');

// Función para normalizar nombres de archivos para comparación
function normalizeId(filename) {
  return filename
    .toLowerCase()
    .replace(/\.png$/, '')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/\s+/g, '-');
}

async function migrateImages() {
  console.log('🚀 Iniciando migración de imágenes...\n');

  // Leer el glosario
  const glosarioContent = fs.readFileSync(GLOSARIO_PATH, 'utf-8');
  const glosario = JSON.parse(glosarioContent);

  // Obtener lista de imágenes en NEW_IMAGES
  const newImages = fs.readdirSync(NEW_IMAGES_DIR).filter(file => file.endsWith('.png'));
  console.log(`📁 Encontradas ${newImages.length} imágenes en NEW_IMAGES/\n`);

  // Obtener lista de imágenes ya existentes en assets/img
  const existingImages = fs.readdirSync(TARGET_DIR).filter(file => file.endsWith('.png'));
  const existingSet = new Set(existingImages.map(img => normalizeId(img)));

  let movedCount = 0;
  let skippedCount = 0;
  let updatedTerms = 0;

  // Procesar cada imagen
  for (const imageFile of newImages) {
    const normalizedName = normalizeId(imageFile);

    // Verificar si la imagen ya existe
    if (existingSet.has(normalizedName)) {
      console.log(`⏭️  Omitiendo ${imageFile} (ya existe)`);
      skippedCount++;
      continue;
    }

    // Mover la imagen
    const sourcePath = path.join(NEW_IMAGES_DIR, imageFile);
    const targetPath = path.join(TARGET_DIR, imageFile);

    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Movida: ${imageFile}`);
      movedCount++;

      // Buscar el término correspondiente en el glosario
      const termId = normalizedName;
      const termIndex = glosario.terminos.findIndex(t => t.id === termId);

      if (termIndex !== -1) {
        // Actualizar el término con la referencia a la imagen
        if (!glosario.terminos[termIndex].imagen) {
          glosario.terminos[termIndex].imagen = `assets/img/${imageFile}`;
          updatedTerms++;
          console.log(`   📝 Actualizado término: ${glosario.terminos[termIndex].termino}`);
        }
      } else {
        console.log(`   ⚠️  No se encontró término para: ${imageFile}`);
      }
    } catch (error) {
      console.error(`❌ Error moviendo ${imageFile}:`, error.message);
    }
  }

  // Guardar el glosario actualizado
  if (updatedTerms > 0) {
    fs.writeFileSync(GLOSARIO_PATH, JSON.stringify(glosario, null, 2), 'utf-8');
    console.log(`\n💾 Glosario actualizado con ${updatedTerms} nuevas referencias de imágenes`);
  }

  // Resumen
  console.log('\n📊 Resumen de la migración:');
  console.log(`   ✅ Imágenes movidas: ${movedCount}`);
  console.log(`   ⏭️  Imágenes omitidas (ya existen): ${skippedCount}`);
  console.log(`   📝 Términos actualizados: ${updatedTerms}`);

  // Preguntar si borrar la carpeta NEW_IMAGES
  if (movedCount > 0) {
    console.log('\n🗑️  Para borrar la carpeta NEW_IMAGES después de verificar, ejecuta:');
    console.log('   node migrate-images.js --delete');
  }

  // Si se pasó el flag --delete, borrar NEW_IMAGES
  if (process.argv.includes('--delete')) {
    console.log('\n🗑️  Borrando carpeta NEW_IMAGES...');
    fs.rmSync(NEW_IMAGES_DIR, { recursive: true, force: true });
    console.log('✅ Carpeta NEW_IMAGES eliminada');
  }

  console.log('\n✨ Migración completada!\n');
}

// Ejecutar la migración
migrateImages().catch(error => {
  console.error('❌ Error en la migración:', error);
  process.exit(1);
});
