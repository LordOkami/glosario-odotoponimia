#!/usr/bin/env node

/**
 * Script para organizar las imágenes descargadas de ChatGPT Plus (DALL-E 3)
 * Renombra automáticamente las imágenes descargadas a los nombres correctos
 */

import fs from "fs/promises";
import path from "path";

const BATCH_SIZE = 40;
const IMAGES_DIR = "./assets/img";
const DOWNLOADS_DIR = process.env.DOWNLOADS_DIR || "./downloads";

// Colores para la consola
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
};

/**
 * Lee un batch file y extrae la lista de términos en orden
 */
async function readBatchFile(batchNum) {
  const filename = `dalle3-batch${batchNum}.txt`;
  const content = await fs.readFile(filename, "utf-8");

  // Extraer la sección de nombres de archivo
  const filenameSection = content.split("LISTA DE TÉRMINOS (para referencia):")[1];
  if (!filenameSection) {
    throw new Error(`No se pudo encontrar la lista de términos en ${filename}`);
  }

  const lines = filenameSection.trim().split("\n");
  const terms = [];

  for (const line of lines) {
    const match = line.match(/^\d+\.\s+(.+?)\s+→\s+(.+\.png)$/);
    if (match) {
      terms.push({
        termino: match[1],
        filename: match[2],
      });
    }
  }

  return terms;
}

/**
 * Encuentra las imágenes descargadas (varios patrones posibles de ChatGPT)
 */
async function findDownloadedImages(dir) {
  const files = await fs.readdir(dir);

  // Patrones comunes de ChatGPT:
  // - DALL·E 2024-01-15 12.34.56 - description.png
  // - image.png, image(1).png, image(2).png
  // - dalle-xxxxx.png

  const imageFiles = files
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort((a, b) => {
      // Intentar extraer número del nombre
      const numA = parseInt(a.match(/\d+/)?.[0] || "0");
      const numB = parseInt(b.match(/\d+/)?.[0] || "0");

      // Si no hay números, ordenar por fecha de modificación
      if (numA === 0 && numB === 0) {
        return a.localeCompare(b);
      }

      return numA - numB;
    });

  return imageFiles;
}

/**
 * Organiza las imágenes descargadas
 */
async function organizeImages(batchNum) {
  console.log(`${colors.bright}${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║     Organizador de Imágenes ChatGPT Plus (DALL-E 3)      ║
╚════════════════════════════════════════════════════════════╝${colors.reset}
`);

  console.log(`${colors.blue}📝 Leyendo batch ${batchNum}...${colors.reset}`);
  const terms = await readBatchFile(batchNum);
  console.log(`${colors.green}✓ ${terms.length} términos esperados${colors.reset}\n`);

  console.log(`${colors.blue}🔍 Buscando imágenes descargadas en ${DOWNLOADS_DIR}...${colors.reset}`);

  let downloadedImages;
  try {
    downloadedImages = await findDownloadedImages(DOWNLOADS_DIR);
  } catch (error) {
    console.log(`${colors.yellow}⚠️  Carpeta ${DOWNLOADS_DIR} no encontrada${colors.reset}`);
    console.log(`${colors.cyan}Buscando en el directorio actual...${colors.reset}\n`);
    downloadedImages = await findDownloadedImages(".");
  }

  if (downloadedImages.length === 0) {
    console.log(`${colors.red}❌ No se encontraron imágenes PNG${colors.reset}\n`);
    console.log(`${colors.cyan}Asegúrate de:`);
    console.log(`1. Haber descargado las imágenes de ChatGPT Plus`);
    console.log(`2. Colocarlas en la carpeta ${DOWNLOADS_DIR} o en el directorio actual`);
    console.log(`3. Que sean archivos .png${colors.reset}\n`);
    return;
  }

  console.log(`${colors.green}✓ ${downloadedImages.length} imágenes encontradas${colors.reset}\n`);

  if (downloadedImages.length !== terms.length) {
    console.log(`${colors.yellow}⚠️  ADVERTENCIA: Se esperaban ${terms.length} imágenes pero se encontraron ${downloadedImages.length}${colors.reset}`);
    console.log(`${colors.cyan}Procesando las primeras ${Math.min(downloadedImages.length, terms.length)} imágenes...${colors.reset}\n`);
  }

  // Crear directorio de destino si no existe
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  // Renombrar y mover archivos
  let successCount = 0;
  let errorCount = 0;

  const maxImages = Math.min(downloadedImages.length, terms.length);

  for (let i = 0; i < maxImages; i++) {
    const sourceFile = downloadedImages[i];
    const term = terms[i];
    const sourcePath = path.join(DOWNLOADS_DIR, sourceFile);
    const destPath = path.join(IMAGES_DIR, term.filename);

    try {
      // Verificar si el archivo existe en downloads o en directorio actual
      let actualSourcePath = sourcePath;
      try {
        await fs.access(sourcePath);
      } catch {
        actualSourcePath = sourceFile; // Está en directorio actual
      }

      // Copiar (no mover) para mantener originales por seguridad
      await fs.copyFile(actualSourcePath, destPath);

      console.log(`${colors.green}✓${colors.reset} ${sourceFile} → ${colors.cyan}${term.filename}${colors.reset}`);
      successCount++;
    } catch (error) {
      console.log(`${colors.red}✗${colors.reset} Error con ${sourceFile}: ${error.message}`);
      errorCount++;
    }
  }

  // Resumen
  console.log(`\n${colors.bright}${colors.green}
╔════════════════════════════════════════════════════════════╗
║                   ORGANIZACIÓN COMPLETADA                  ║
╚════════════════════════════════════════════════════════════╝${colors.reset}
`);
  console.log(`${colors.green}✅ Exitosas: ${successCount}${colors.reset}`);
  if (errorCount > 0) {
    console.log(`${colors.red}❌ Errores: ${errorCount}${colors.reset}`);
  }
  console.log(`${colors.cyan}📁 Ubicación: ${IMAGES_DIR}${colors.reset}\n`);

  if (successCount > 0) {
    console.log(`${colors.bright}Próximos pasos:${colors.reset}`);
    if (batchNum < 7) {
      console.log(`1. Continúa con el siguiente batch:`);
      console.log(`   ${colors.cyan}node create-dalle3-batches.js${colors.reset}`);
      console.log(`   Usa ${colors.cyan}dalle3-batch${batchNum + 1}.txt${colors.reset} en ChatGPT Plus\n`);
    } else {
      console.log(`${colors.green}¡Todas las imágenes han sido generadas!${colors.reset}`);
      console.log(`Ejecuta ${colors.cyan}git add .${colors.reset} y ${colors.cyan}git commit${colors.reset} para subir los cambios\n`);
    }
  }
}

// Obtener número de batch de los argumentos
const batchNum = parseInt(process.argv[2]);

if (!batchNum || batchNum < 1 || batchNum > 7) {
  console.error(`${colors.red}❌ Error: Debes especificar un número de batch válido (1-7)${colors.reset}\n`);
  console.log(`Uso: ${colors.cyan}node organize-dalle3-images.js <número-batch>${colors.reset}`);
  console.log(`Ejemplo: ${colors.cyan}node organize-dalle3-images.js 1${colors.reset}\n`);
  process.exit(1);
}

organizeImages(batchNum).catch((error) => {
  console.error(`${colors.red}❌ Error fatal:${colors.reset}`, error);
  process.exit(1);
});
