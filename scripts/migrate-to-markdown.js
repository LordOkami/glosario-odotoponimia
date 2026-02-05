/**
 * Script de migración: Convierte glosario.json a archivos Markdown individuales
 * Esto permite usar la paginación nativa de Decap CMS para mejorar el rendimiento del admin
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const glosarioPath = path.join(__dirname, '../data/glosario.json');
const terminosDir = path.join(__dirname, '../content/terminos');
const introduccionPath = path.join(__dirname, '../content/introduccion.json');

// Leer el glosario actual
const glosarioData = JSON.parse(fs.readFileSync(glosarioPath, 'utf8'));

// Crear directorio de términos si no existe
if (!fs.existsSync(terminosDir)) {
    fs.mkdirSync(terminosDir, { recursive: true });
}

// Guardar la introducción en un archivo separado
fs.writeFileSync(
    introduccionPath,
    JSON.stringify({ introduccion: glosarioData.introduccion }, null, 2)
);

console.log('✓ Introducción guardada en content/introduccion.json');

// Migrar cada término a un archivo Markdown
let contadorExito = 0;
let contadorError = 0;

glosarioData.terminos.forEach((termino) => {
    try {
        // Crear contenido del frontmatter
        const frontmatter = {
            id: termino.id,
            termino: termino.termino,
            letra: termino.letra,
            ...(termino.imagen && { imagen: termino.imagen })
        };

        // Crear contenido del archivo Markdown
        const markdown = `---
${Object.entries(frontmatter)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n')}
---

${termino.definicion}
`;

        // Guardar archivo
        const filename = `${termino.id}.md`;
        const filepath = path.join(terminosDir, filename);
        fs.writeFileSync(filepath, markdown);

        contadorExito++;
    } catch (error) {
        console.error(`✗ Error al migrar término "${termino.termino}":`, error.message);
        contadorError++;
    }
});

console.log('\n=== Resumen de Migración ===');
console.log(`✓ Términos migrados exitosamente: ${contadorExito}`);
if (contadorError > 0) {
    console.log(`✗ Términos con errores: ${contadorError}`);
}
console.log(`\nArchivos creados en: ${terminosDir}`);
