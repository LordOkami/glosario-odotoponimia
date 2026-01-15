# Generación Automática de Ilustraciones

Este documento explica cómo generar automáticamente las 314 ilustraciones del glosario usando OpenRouter AI.

## 📋 Requisitos Previos

1. **Node.js** (versión 18 o superior)
2. **Cuenta de OpenRouter** con créditos
3. **API Key de OpenRouter** (obtén una en https://openrouter.ai/keys)

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar API Key

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita el archivo `.env` y añade tu API key:

```env
OPENROUTER_API_KEY=sk-or-v1-tu-api-key-aqui
```

**⚠️ IMPORTANTE:**
- **NUNCA** compartas tu API key públicamente
- El archivo `.env` está en `.gitignore` para proteger tu key
- **REVOCA** inmediatamente cualquier key que hayas compartido accidentalmente

## 💰 Costos Estimados

- **Modelo**: `openai/gpt-5-image`
- **Costo por imagen**: ~$0.04 USD
- **Total (314 imágenes)**: ~$12.56 USD

Con $8 en tu cuenta de OpenRouter, puedes generar aproximadamente **200 imágenes**.

## 🎨 Uso

### Generar todas las imágenes

```bash
npm run generate-images
```

### Características del script:

✅ **Generación automática**: Procesa todos los prompts del archivo `prompts-ilustraciones.txt`

✅ **Guardado automático**: Las imágenes se guardan en `assets/img/` con los nombres correctos

✅ **Progreso guardado**: Puedes pausar (Ctrl+C) y continuar después sin perder progreso

✅ **Reintentos automáticos**: Si una imagen falla, reintenta automáticamente 3 veces

✅ **Estadísticas en tiempo real**: Muestra tiempo restante, costo acumulado y estado

✅ **Manejo de errores**: Registra las imágenes que fallaron para reintentarlas después

## 📊 Durante la Ejecución

El script mostrará:

```
╔════════════════════════════════════════════════════════════╗
║  Generador de Ilustraciones - Glosario de Odotoponimia   ║
╚════════════════════════════════════════════════════════════╝

📝 Cargando prompts...
✓ 314 prompts cargados

📊 Estado:
   Total: 314
   Completadas: 50
   Pendientes: 264
   Fallidas: 0

💰 Costo estimado: ~$10.56 USD
💳 Costo total hasta ahora: $2.00 USD

[1/264] abedular
   Prompt: Genera una imagen hecha a mano y a lápiz de un abedular...
   🎨 Generando...
   💾 Descargando...
   ✓ Completada
   ⏱️  Tiempo restante estimado: 2h 15m 30s
```

## ⏸️ Pausar y Continuar

### Para pausar:
Presiona `Ctrl+C` en cualquier momento

### Para continuar:
Ejecuta nuevamente:
```bash
npm run generate-images
```

El script detectará automáticamente qué imágenes ya están generadas y continuará desde donde se quedó.

## 📁 Archivos Generados

- **`assets/img/*.png`**: Las imágenes generadas
- **`generation-progress.json`**: Archivo de progreso (no subir a git)
  ```json
  {
    "completed": ["abrevadero.png", "acantilado.png", ...],
    "failed": [],
    "lastProcessed": 1234567890,
    "totalCost": 2.50
  }
  ```

## ❌ Solución de Problemas

### Error: "OPENROUTER_API_KEY no está configurada"

Asegúrate de:
1. Haber creado el archivo `.env`
2. Tener la key correcta en el archivo
3. No tener espacios extras en la configuración

### Error: "Insufficient credits"

Tu cuenta de OpenRouter se quedó sin créditos. Opciones:
1. Añadir más créditos en https://openrouter.ai/
2. El script guardó el progreso, puedes continuar después de recargar

### Imágenes fallidas

Si algunas imágenes fallan:
1. El script las registra en `generation-progress.json`
2. Vuelve a ejecutar el script para reintentarlas
3. Revisa los errores específicos en la consola

### Límite de rate (demasiadas peticiones)

El script incluye pausas de 1 segundo entre imágenes, pero si aún así hay errores:
- Aumenta el delay en `generate-images.js` (línea con `setTimeout(resolve, 1000)`)
- Cambia `1000` a `2000` o `3000` (2-3 segundos)

## 🔍 Verificación

Una vez generadas las imágenes:

1. **Revisa la carpeta**: `assets/img/` debe tener las imágenes
2. **Prueba la web**: Abre `index.html` y verifica que las imágenes se muestran
3. **Revisa el progreso**: Mira `generation-progress.json` para ver estadísticas

## 📝 Notas

- El script salta automáticamente `abrevadero.png` (ya existe)
- Los nombres de archivo están normalizados (sin acentos, con guiones)
- Las imágenes se generan una por una para evitar problemas de rate limiting
- El progreso se guarda cada 5 imágenes para evitar pérdidas

## 🛡️ Seguridad

**NUNCA** hagas lo siguiente:
- ❌ Compartir tu `.env` o API key públicamente
- ❌ Subir `.env` a git (ya está en `.gitignore`)
- ❌ Compartir screenshots que muestren tu API key
- ❌ Usar la API key de otra persona

**SI compartiste tu API key accidentalmente:**
1. Ve inmediatamente a https://openrouter.ai/keys
2. Revoca la key comprometida
3. Genera una nueva key
4. Actualiza tu archivo `.env`

## 💡 Consejos

- **Estima bien el costo**: Con $8 puedes hacer ~200 imágenes
- **Genera en bloques**: Puedes pausar cada 50-100 imágenes para revisar calidad
- **Revisa el progreso**: El archivo `generation-progress.json` te muestra el costo real
- **Haz pruebas**: Genera 2-3 imágenes primero para verificar que todo funciona

## 📞 Soporte

Si tienes problemas:
1. Revisa esta documentación
2. Verifica la consola de errores
3. Revisa el archivo `generation-progress.json`
4. Consulta la documentación de OpenRouter: https://openrouter.ai/docs
