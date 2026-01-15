# 🎨 Generación GRATUITA de Ilustraciones con Hugging Face

Este documento explica cómo generar las ilustraciones restantes **COMPLETAMENTE GRATIS** usando Hugging Face.

## 🆓 ¿Por qué Hugging Face?

- ✅ **Completamente GRATIS** - Sin tarjeta de crédito
- ✅ **Ilimitado** - No hay límites diarios
- ✅ **Automatizado** - Script que genera todas las imágenes
- ✅ **Buena calidad** - Usa modelos Stable Diffusion y FLUX
- ✅ **Sin costo** - $0.00 USD

## 📋 Requisitos

1. **Cuenta de Hugging Face** (gratis)
2. **Token de API** (gratis)
3. **Node.js** instalado

## 🚀 Guía Paso a Paso

### Paso 1: Crear cuenta en Hugging Face

1. Ve a https://huggingface.co/join
2. Regístrate gratis (email + contraseña)
3. Verifica tu email

### Paso 2: Obtener tu Token de API

1. Ve a https://huggingface.co/settings/tokens
2. Click en **"New token"**
3. Configuración:
   - **Name**: `glosario-imagenes`
   - **Type**: Selecciona **"Read"** (solo lectura es suficiente)
4. Click en **"Generate token"**
5. **COPIA EL TOKEN** (solo se muestra una vez)

### Paso 3: Configurar el Token

Abre el archivo `.env` y añade tu token:

```env
HUGGINGFACE_API_KEY=hf_tu_token_aqui
```

### Paso 4: Ejecutar el Script

```bash
npm run generate:huggingface
```

O si quieres generar solo un número específico:

```bash
MAX_IMAGES=50 npm run generate:hf
```

## ⚙️ Configuración del Modelo

El script usa por defecto `FLUX.1-schnell` (rápido y gratis). Puedes cambiarlo en `generate-images-huggingface.js`:

### Modelos disponibles (todos GRATIS):

1. **FLUX.1-schnell** ⚡ (Recomendado - Muy rápido)
   ```javascript
   model: "black-forest-labs/FLUX.1-schnell"
   ```
   - Velocidad: ⭐⭐⭐⭐⭐
   - Calidad: ⭐⭐⭐⭐
   - Estilo: Moderno, realista

2. **Stable Diffusion XL** 🎨 (Mejor calidad)
   ```javascript
   model: "stabilityai/stable-diffusion-xl-base-1.0"
   ```
   - Velocidad: ⭐⭐⭐
   - Calidad: ⭐⭐⭐⭐⭐
   - Estilo: Detallado, artístico

3. **Stable Diffusion v1.5** 🏃 (Más rápido)
   ```javascript
   model: "runwayml/stable-diffusion-v1-5"
   ```
   - Velocidad: ⭐⭐⭐⭐
   - Calidad: ⭐⭐⭐⭐
   - Estilo: Versátil

## 📊 Durante la Ejecución

```
╔════════════════════════════════════════════════════════════╗
║  Generador de Ilustraciones - Hugging Face (GRATIS)      ║
╚════════════════════════════════════════════════════════════╝

📝 Cargando prompts...
✓ 276 prompts cargados

📊 Estado:
   Total: 314
   Completadas: 38
   Pendientes: 276
   Fallidas: 0

💰 Costo: GRATIS (Hugging Face)
🤖 Modelo: black-forest-labs/FLUX.1-schnell

[1/276] abedular
   Prompt: Genera una imagen hecha a mano y a lápiz de un abedular...
   🎨 Generando...
   💾 Guardando...
   ✓ Completada
   ⏱️  Tiempo restante estimado: 3h 45m
```

## ⚠️ Notas Importantes

### Primera ejecución (Carga del modelo)

La primera vez que ejecutes el script, verás:

```
⏳ Modelo cargando... esperando 20s
```

**Esto es NORMAL**. El modelo tarda ~20-60 segundos en cargar la primera vez. Después de eso, las imágenes se generan en ~5-10 segundos cada una.

### Velocidad estimada

- **FLUX.1-schnell**: ~5-10 segundos por imagen
- **SDXL**: ~15-30 segundos por imagen
- **SD v1.5**: ~8-12 segundos por imagen

**Para 276 imágenes:**
- FLUX: ~25-45 minutos
- SDXL: ~1-2 horas
- SD v1.5: ~35-55 minutos

## 🔄 Pausar y Continuar

El script guarda el progreso cada 5 imágenes en `generation-progress-hf.json`.

**Para pausar**: Presiona `Ctrl+C`

**Para continuar**: Ejecuta de nuevo:
```bash
npm run generate:hf
```

El script detectará automáticamente qué imágenes ya están generadas y continuará desde donde se quedó.

## ❌ Solución de Problemas

### Error: "HUGGINGFACE_API_KEY no está configurada"

Verifica que:
1. Tienes el archivo `.env` en la raíz del proyecto
2. El token está correctamente copiado (sin espacios extras)
3. El formato es: `HUGGINGFACE_API_KEY=hf_...`

### Error 401: Authentication failed

Tu token puede estar incorrecto o expirado:
1. Ve a https://huggingface.co/settings/tokens
2. Revoca el token anterior
3. Genera uno nuevo
4. Actualiza el `.env`

### Error 503: Model loading

El modelo está cargándose. El script esperará automáticamente y reintentará.

### Imágenes de baja calidad

Si las imágenes no son de buena calidad:
1. Cambia a un modelo mejor (SDXL)
2. Aumenta `num_inference_steps` en el script (línea 104):
   ```javascript
   num_inference_steps: 50, // Más pasos = mejor calidad
   ```

## 📁 Archivos Generados

- **`assets/img/*.png`**: Las imágenes generadas
- **`generation-progress-hf.json`**: Progreso del script
  ```json
  {
    "completed": ["abrevadero.png", "acantilado.png", ...],
    "failed": [],
    "lastProcessed": 1234567890,
    "totalCost": 0
  }
  ```

## 💡 Consejos

1. **Ejecuta por bloques**: Genera 50 imágenes a la vez para revisar calidad
   ```bash
   MAX_IMAGES=50 npm run generate:hf
   ```

2. **Cambia de modelo si no te gusta el estilo**

3. **El script es inteligente**: Salta imágenes ya generadas

4. **Guarda el progreso frecuentemente**: El script lo hace cada 5 imágenes

## 🔐 Seguridad

- ✅ Tu token está en `.env` (ignorado por git)
- ✅ **NUNCA** compartas tu token
- ✅ **NUNCA** subas el `.env` a GitHub
- ✅ Si lo expones accidentalmente, revócalo inmediatamente

## 📞 ¿Necesitas ayuda?

Si tienes problemas:
1. Verifica que tu token sea válido en https://huggingface.co/settings/tokens
2. Revisa la consola de errores
3. Verifica el archivo `generation-progress-hf.json`
4. Consulta la documentación de Hugging Face: https://huggingface.co/docs/api-inference

## 🎯 Resumen

1. Crear cuenta en Hugging Face ✓
2. Obtener token gratis ✓
3. Añadir token al `.env` ✓
4. Ejecutar `npm run generate:hf` ✓
5. Esperar ~30-60 minutos ✓
6. ¡276 imágenes GRATIS! ✓

**Total invertido: $0.00 USD** 🎉
