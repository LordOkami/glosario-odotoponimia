#!/usr/bin/env node

/**
 * Script para generar imágenes de ilustraciones del glosario
 * usando OpenRouter AI (openai/gpt-5-image)
 */

import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";
import { finished } from "stream/promises";
import { Readable } from "stream";

// Configuración
const CONFIG = {
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openai/gpt-5-image",
  apiUrl: "https://openrouter.ai/api/v1/chat/completions",
  promptsFile: "./prompts-ilustraciones.txt",
  outputDir: "./assets/img",
  progressFile: "./generation-progress.json",
  maxRetries: 3,
  retryDelay: 2000, // 2 segundos
  maxImages: parseInt(process.env.MAX_IMAGES || "999"), // Límite de imágenes a generar
};

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
 * Parsea el archivo de prompts y extrae la información
 */
async function parsePromptsFile() {
  const content = await fs.readFile(CONFIG.promptsFile, "utf-8");
  const lines = content.split("\n");

  const prompts = [];
  let currentNumber = null;
  let currentFilename = null;
  let currentPrompt = null;

  for (const line of lines) {
    // Buscar líneas como: "1. abedular.png"
    const numberMatch = line.match(/^(\d+)\.\s+(.+\.png)$/);
    if (numberMatch) {
      currentNumber = parseInt(numberMatch[1]);
      currentFilename = numberMatch[2];
      continue;
    }

    // Buscar líneas que empiezan con "Genera una imagen"
    if (line.startsWith("Genera una imagen")) {
      currentPrompt = line;

      if (currentNumber && currentFilename && currentPrompt) {
        // Extraer el término del prompt
        const terminoMatch = currentPrompt.match(/de (?:un|una|el|la) ([^:,]+):/);
        const termino = terminoMatch ? terminoMatch[1].trim() : "";

        prompts.push({
          number: currentNumber,
          filename: currentFilename,
          prompt: currentPrompt,
          termino: termino,
        });

        currentNumber = null;
        currentFilename = null;
        currentPrompt = null;
      }
    }
  }

  return prompts;
}

/**
 * Descarga una imagen desde una URL base64 o HTTP
 */
async function downloadImage(imageUrl, outputPath) {
  // Si es una URL base64
  if (imageUrl.startsWith("data:")) {
    const base64Data = imageUrl.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");
    await fs.writeFile(outputPath, buffer);
    return;
  }

  // Si es una URL HTTP
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const fileStream = createWriteStream(outputPath);
  await finished(Readable.fromWeb(response.body).pipe(fileStream));
}

/**
 * Genera una imagen usando OpenRouter API
 */
async function generateImage(prompt, retryCount = 0) {
  try {
    const response = await fetch(CONFIG.apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CONFIG.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/tu-repo",
        "X-Title": "Glosario Odotoponimia Generator"
      },
      body: JSON.stringify({
        model: CONFIG.model,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    const message = result.choices[0].message;

    if (message.images && message.images.length > 0) {
      return message.images[0].image_url.url;
    }

    throw new Error("No image generated in response");
  } catch (error) {
    if (retryCount < CONFIG.maxRetries) {
      console.log(
        `${colors.yellow}⚠️  Retry ${retryCount + 1}/${CONFIG.maxRetries}...${colors.reset}`
      );
      await new Promise((resolve) => setTimeout(resolve, CONFIG.retryDelay));
      return generateImage(prompt, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Carga el progreso previo
 */
async function loadProgress() {
  try {
    const content = await fs.readFile(CONFIG.progressFile, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return {
      completed: [],
      failed: [],
      lastProcessed: 0,
      totalCost: 0,
    };
  }
}

/**
 * Guarda el progreso actual
 */
async function saveProgress(progress) {
  await fs.writeFile(CONFIG.progressFile, JSON.stringify(progress, null, 2));
}

/**
 * Formatea el tiempo en formato legible
 */
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Función principal
 */
async function main() {
  console.log(`${colors.bright}${colors.cyan}
╔════════════════════════════════════════════════════════════╗
║  Generador de Ilustraciones - Glosario de Odotoponimia   ║
╚════════════════════════════════════════════════════════════╝${colors.reset}
`);

  // Verificar API key
  if (!CONFIG.apiKey) {
    console.error(`${colors.red}❌ Error: OPENROUTER_API_KEY no está configurada${colors.reset}`);
    console.log(`
Por favor, crea un archivo .env con:
OPENROUTER_API_KEY=tu-api-key-aqui
`);
    process.exit(1);
  }

  // Crear directorio de salida si no existe
  await fs.mkdir(CONFIG.outputDir, { recursive: true });

  // Cargar prompts
  console.log(`${colors.blue}📝 Cargando prompts...${colors.reset}`);
  const prompts = await parsePromptsFile();
  console.log(`${colors.green}✓ ${prompts.length} prompts cargados${colors.reset}\n`);

  // Cargar progreso previo
  const progress = await loadProgress();
  const completed = new Set(progress.completed);

  // Filtrar prompts ya completados
  let pendingPrompts = prompts.filter((p) => !completed.has(p.filename));

  // Limitar a maxImages si está configurado
  if (CONFIG.maxImages < 999) {
    pendingPrompts = pendingPrompts.slice(0, CONFIG.maxImages);
    console.log(`${colors.yellow}⚠️  Limitando a ${CONFIG.maxImages} imágenes${colors.reset}\n`);
  }

  if (pendingPrompts.length === 0) {
    console.log(`${colors.green}✅ ¡Todas las imágenes ya están generadas!${colors.reset}`);
    return;
  }

  console.log(`${colors.cyan}📊 Estado:${colors.reset}`);
  console.log(`   Total: ${prompts.length}`);
  console.log(`   ${colors.green}Completadas: ${completed.size}${colors.reset}`);
  console.log(`   ${colors.yellow}Pendientes: ${pendingPrompts.length}${colors.reset}`);
  console.log(`   ${colors.red}Fallidas: ${progress.failed.length}${colors.reset}\n`);

  // Estimación de costo (aproximado para DALL-E 3)
  const estimatedCost = pendingPrompts.length * 0.04;
  console.log(`${colors.yellow}💰 Costo estimado: ~$${estimatedCost.toFixed(2)} USD${colors.reset}`);
  console.log(`${colors.yellow}💳 Costo total hasta ahora: $${progress.totalCost.toFixed(2)} USD${colors.reset}\n`);

  // Confirmar antes de continuar
  console.log(`${colors.bright}¿Deseas continuar? (Presiona Ctrl+C para cancelar)${colors.reset}`);
  console.log(`${colors.cyan}Iniciando en 5 segundos...${colors.reset}\n`);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Generar imágenes
  const startTime = Date.now();
  let successCount = 0;
  let failCount = 0;
  let currentCost = 0;

  for (let i = 0; i < pendingPrompts.length; i++) {
    const item = pendingPrompts[i];
    const outputPath = path.join(CONFIG.outputDir, item.filename);

    console.log(`${colors.bright}[${i + 1}/${pendingPrompts.length}]${colors.reset} ${item.termino || item.filename}`);
    console.log(`   Prompt: ${item.prompt.substring(0, 80)}...`);

    try {
      // Generar imagen
      console.log(`   ${colors.blue}🎨 Generando...${colors.reset}`);
      const imageUrl = await generateImage(item.prompt);

      // Descargar imagen
      console.log(`   ${colors.blue}💾 Descargando...${colors.reset}`);
      await downloadImage(imageUrl, outputPath);

      // Actualizar progreso
      completed.add(item.filename);
      successCount++;
      currentCost += 0.04; // Costo aproximado por imagen

      console.log(`   ${colors.green}✓ Completada${colors.reset}`);

      // Guardar progreso cada 5 imágenes
      if (successCount % 5 === 0) {
        progress.completed = Array.from(completed);
        progress.totalCost += currentCost;
        currentCost = 0;
        await saveProgress(progress);
      }
    } catch (error) {
      failCount++;
      progress.failed.push({
        filename: item.filename,
        error: error.message,
        timestamp: new Date().toISOString(),
      });

      console.log(`   ${colors.red}✗ Error: ${error.message}${colors.reset}`);
    }

    // Mostrar estadísticas de progreso
    const elapsed = Date.now() - startTime;
    const avgTime = elapsed / (i + 1);
    const remaining = avgTime * (pendingPrompts.length - i - 1);

    console.log(`   ${colors.cyan}⏱️  Tiempo restante estimado: ${formatTime(remaining)}${colors.reset}`);
    console.log("");

    // Pequeña pausa entre requests para evitar rate limiting
    if (i < pendingPrompts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Guardar progreso final
  progress.completed = Array.from(completed);
  progress.totalCost += currentCost;
  progress.lastProcessed = Date.now();
  await saveProgress(progress);

  // Resumen final
  const totalTime = Date.now() - startTime;
  console.log(`${colors.bright}${colors.green}
╔════════════════════════════════════════════════════════════╗
║                    GENERACIÓN COMPLETADA                   ║
╚════════════════════════════════════════════════════════════╝${colors.reset}
`);
  console.log(`${colors.green}✅ Exitosas: ${successCount}${colors.reset}`);
  console.log(`${colors.red}❌ Fallidas: ${failCount}${colors.reset}`);
  console.log(`${colors.cyan}⏱️  Tiempo total: ${formatTime(totalTime)}${colors.reset}`);
  console.log(`${colors.yellow}💰 Costo total: $${progress.totalCost.toFixed(2)} USD${colors.reset}\n`);

  if (progress.failed.length > 0) {
    console.log(`${colors.yellow}⚠️  Hay ${progress.failed.length} imágenes que fallaron:${colors.reset}`);
    progress.failed.forEach((f) => {
      console.log(`   - ${f.filename}: ${f.error}`);
    });
    console.log(`\n${colors.cyan}Puedes volver a ejecutar el script para reintentar las fallidas.${colors.reset}\n`);
  }
}

// Ejecutar
main().catch((error) => {
  console.error(`${colors.red}❌ Error fatal:${colors.reset}`, error);
  process.exit(1);
});
