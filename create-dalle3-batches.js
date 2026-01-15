#!/usr/bin/env node

/**
 * Script para crear batches de prompts para ChatGPT Plus (DALL-E 3)
 */

import fs from "fs/promises";
import path from "path";

const BATCH_SIZE = 40;
const PROMPTS_FILE = "./prompts-ilustraciones.txt";
const OUTPUT_DIR = "./";
const IMAGES_DIR = "./assets/img";

async function parsePromptsFile() {
  const content = await fs.readFile(PROMPTS_FILE, "utf-8");
  const lines = content.split("\n");

  const prompts = [];
  let currentNumber = null;
  let currentFilename = null;
  let currentPrompt = null;

  for (const line of lines) {
    const numberMatch = line.match(/^(\d+)\.\s+(.+\.png)$/);
    if (numberMatch) {
      currentNumber = parseInt(numberMatch[1]);
      currentFilename = numberMatch[2];
      continue;
    }

    if (line.startsWith("Genera una imagen")) {
      currentPrompt = line;

      if (currentNumber && currentFilename && currentPrompt) {
        const terminoMatch = currentPrompt.match(/de (?:un|una|el|la) ([^:,]+):/);
        const termino = terminoMatch ? terminoMatch[1].trim() : "";
        const definicionMatch = currentPrompt.match(/: (.+), tiene que/);
        const definicion = definicionMatch ? definicionMatch[1].trim() : "";

        prompts.push({
          number: currentNumber,
          filename: currentFilename,
          termino: termino,
          definicion: definicion,
        });

        currentNumber = null;
        currentFilename = null;
        currentPrompt = null;
      }
    }
  }

  return prompts;
}

async function getExistingImages() {
  try {
    const files = await fs.readdir(IMAGES_DIR);
    return new Set(files.filter(f => f.endsWith('.png')));
  } catch (error) {
    return new Set();
  }
}

async function createBatches() {
  console.log("📝 Leyendo prompts...");
  const allPrompts = await parsePromptsFile();

  console.log("🔍 Verificando imágenes existentes...");
  const existing = await getExistingImages();

  const pending = allPrompts.filter(p => !existing.has(p.filename));

  console.log(`✅ Total prompts: ${allPrompts.length}`);
  console.log(`✅ Imágenes existentes: ${existing.size}`);
  console.log(`⏳ Pendientes: ${pending.length}`);

  const numBatches = Math.ceil(pending.length / BATCH_SIZE);
  console.log(`📦 Creando ${numBatches} batches de ${BATCH_SIZE} imágenes...\n`);

  for (let i = 0; i < numBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, pending.length);
    const batchPrompts = pending.slice(start, end);
    const batchNum = i + 1;

    let content = `╔════════════════════════════════════════════════════════════╗
║        BATCH ${batchNum}/${numBatches} - ChatGPT Plus con DALL-E 3            ║
║           Imágenes ${start + 1}-${end} (${batchPrompts.length} imágenes)                  ║
╚════════════════════════════════════════════════════════════╝

INSTRUCCIONES:
1. Copia TODO el prompt de abajo
2. Pégalo en ChatGPT Plus (https://chat.openai.com)
3. Espera a que genere las ${batchPrompts.length} imágenes
4. Descarga todas (click derecho → Guardar imagen)
5. Muévelas a la carpeta del proyecto
6. Ejecuta: node organize-dalle3-images.js

════════════════════════════════════════════════════════════

Genera ${batchPrompts.length} imágenes con estilo de ilustración hecha a mano a lápiz, sutiles y elegantes, como ilustraciones de un libro de biología antiguo, sin texto alguno. Cada ilustración debe ser minimalista y científica:

`;

    batchPrompts.forEach((p, idx) => {
      content += `${idx + 1}. ${p.termino.toUpperCase()}: ${p.definicion}\n`;
    });

    content += `\n════════════════════════════════════════════════════════════\n\n`;
    content += `LISTA DE TÉRMINOS (para referencia):\n`;
    batchPrompts.forEach((p, idx) => {
      content += `${idx + 1}. ${p.termino} → ${p.filename}\n`;
    });

    const filename = `dalle3-batch${batchNum}.txt`;
    await fs.writeFile(filename, content);
    console.log(`✅ Creado: ${filename} (${batchPrompts.length} imágenes)`);
  }

  console.log(`\n🎉 ¡${numBatches} batches creados exitosamente!`);
  console.log(`\n📋 Próximos pasos:`);
  console.log(`1. Abre ChatGPT Plus: https://chat.openai.com`);
  console.log(`2. Copia y pega el contenido de dalle3-batch1.txt`);
  console.log(`3. Descarga las ${BATCH_SIZE} imágenes generadas`);
  console.log(`4. Ejecuta: node organize-dalle3-images.js 1`);
  console.log(`5. Repite con los siguientes batches\n`);

  return { numBatches, totalPending: pending.length };
}

createBatches().catch(console.error);
