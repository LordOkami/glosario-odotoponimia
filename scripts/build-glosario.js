/**
 * Script de build: Genera glosario.json a partir de archivos Markdown individuales
 * Este script se ejecuta antes del deploy para mantener compatibilidad con el frontend
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const terminosDir = path.join(__dirname, '../content/terminos');
const introduccionPath = path.join(__dirname, '../content/introduccion.json');
const glosarioPath = path.join(__dirname, '../data/glosario.json');

/**
 * Parse frontmatter from Markdown file
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        throw new Error('No se encontró frontmatter válido');
    }

    const frontmatterText = match[1];
    const body = match[2].trim();

    // Parse frontmatter fields
    const frontmatter = {};
    const lines = frontmatterText.split('\n');

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();

        // Remove quotes if present
        try {
            frontmatter[key] = JSON.parse(value);
        } catch {
            frontmatter[key] = value;
        }
    });

    return { frontmatter, body };
}

/**
 * Build glosario.json from individual Markdown files
 */
function buildGlosario() {
    console.log('📚 Construyendo glosario.json...\n');

    // Leer introducción
    let introduccion = '';
    if (fs.existsSync(introduccionPath)) {
        const introduccionData = JSON.parse(fs.readFileSync(introduccionPath, 'utf8'));
        introduccion = introduccionData.introduccion || '';
        console.log('✓ Introducción cargada');
    } else {
        console.warn('⚠ No se encontró content/introduccion.json');
    }

    // Leer todos los términos
    const terminos = [];
    let contadorExito = 0;
    let contadorError = 0;

    if (!fs.existsSync(terminosDir)) {
        console.error('✗ No se encontró el directorio content/terminos');
        process.exit(1);
    }

    const files = fs.readdirSync(terminosDir).filter(file => file.endsWith('.md'));

    files.forEach(filename => {
        try {
            const filepath = path.join(terminosDir, filename);
            const content = fs.readFileSync(filepath, 'utf8');
            const { frontmatter, body } = parseFrontmatter(content);

            const termino = {
                id: frontmatter.id,
                termino: frontmatter.termino,
                definicion: body,
                letra: frontmatter.letra
            };

            // Agregar imagen si existe
            if (frontmatter.imagen) {
                termino.imagen = frontmatter.imagen;
            }

            terminos.push(termino);
            contadorExito++;
        } catch (error) {
            console.error(`✗ Error al procesar ${filename}:`, error.message);
            contadorError++;
        }
    });

    // Ordenar términos alfabéticamente
    terminos.sort((a, b) => {
        if (a.letra !== b.letra) {
            return a.letra.localeCompare(b.letra);
        }
        return a.termino.localeCompare(b.termino, 'es', { sensitivity: 'base' });
    });

    // Crear objeto glosario
    const glosario = {
        introduccion,
        terminos
    };

    // Guardar glosario.json
    fs.writeFileSync(glosarioPath, JSON.stringify(glosario, null, 2));

    console.log(`\n✓ Términos procesados: ${contadorExito}`);
    if (contadorError > 0) {
        console.log(`✗ Términos con errores: ${contadorError}`);
    }
    console.log(`\n✓ glosario.json generado exitosamente en: ${glosarioPath}`);
}

// Ejecutar build
try {
    buildGlosario();
} catch (error) {
    console.error('\n✗ Error al construir glosario:', error.message);
    process.exit(1);
}
