# 🏔️ Glosario de Odotoponimia

Una aplicación web moderna y responsive para explorar el glosario completo de términos relacionados con caminos, senderos y geografía. Del griego "odos" (camino).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Características

- 📱 **Mobile-first**: Diseño optimizado para dispositivos móviles
- 🔍 **Búsqueda en tiempo real**: Busca términos por nombre o definición
- 🔤 **Filtro alfabético**: Navega por letras del abecedario
- 🎨 **Diseño moderno**: Interfaz limpia y atractiva inspirada en la naturaleza
- ⚡ **Rendimiento optimizado**: Carga rápida y experiencia fluida
- ♿ **Accesible**: Cumple con estándares de accesibilidad web
- 📖 **314 términos**: Glosario completo extraído del PDF original
- 🌐 **100% Estático**: Sin dependencias de servidor

## 🚀 Demo en Vivo

[Ver Demo](https://tu-sitio.netlify.app) *(Actualiza esta URL después del despliegue)*

## 📦 Estructura del Proyecto

```
Caminos/
├── index.html              # Página principal
├── admin/
│   ├── index.html         # Panel de administración (Decap CMS)
│   └── config.yml         # Configuración del CMS con paginación
├── content/
│   ├── terminos/          # Términos individuales en Markdown (para el admin)
│   └── introduccion.json  # Texto introductorio del glosario
├── css/
│   └── styles.css         # Estilos CSS
├── js/
│   └── app.js             # Lógica de la aplicación
├── data/
│   └── glosario.json      # Datos consolidados (generado automáticamente)
├── scripts/
│   ├── build-glosario.js  # Script para generar glosario.json
│   └── migrate-to-markdown.js  # Script de migración inicial
├── assets/                # Recursos adicionales (opcional)
├── netlify.toml           # Configuración de Netlify
├── _headers               # Headers personalizados
├── robots.txt             # Configuración SEO
└── README.md              # Este archivo
```

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, Grid, Flexbox
- **JavaScript (Vanilla)**: Funcionalidad sin frameworks
- **Decap CMS (Netlify CMS)**: Sistema de gestión de contenidos con paginación
- **Google Fonts**: Inter y Playfair Display
- **Netlify**: Hosting y despliegue

## 🎯 Sistema de Administración con Paginación

El admin usa **Decap CMS** (antes Netlify CMS) con una arquitectura optimizada:

### Características del Admin

- **Paginación nativa**: Carga términos de 20 en 20 (en lugar de 300+ simultáneos)
- **Filtros por letra**: Filtra términos por letra del alfabeto
- **Búsqueda integrada**: Busca términos por nombre
- **Ordenación**: Ordena por término, letra o fecha de commit
- **Edición individual**: Cada término es un archivo Markdown separado

### Arquitectura

```
Admin (Decap CMS)
    ↓
content/terminos/*.md (314 archivos individuales)
    ↓
[npm run build] - Script de build
    ↓
data/glosario.json (archivo consolidado)
    ↓
Frontend (app.js) - Lee el JSON consolidado
```

### Scripts Disponibles

```bash
# Generar glosario.json a partir de archivos Markdown
npm run build

# Migrar datos iniciales de JSON a Markdown (solo una vez)
npm run migrate
```

## 🔧 Instalación Local

### Opción 1: Abrir directamente en el navegador

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/glosario-caminos.git
cd glosario-caminos
```

2. Abre `index.html` en tu navegador

### Opción 2: Usar un servidor local

Con Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Con Node.js (npx):
```bash
npx http-server
```

Con VS Code:
- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

## 🌐 Despliegue en Netlify

### Método 1: Netlify CLI (Recomendado)

1. Instala Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Inicia sesión:
```bash
netlify login
```

3. Despliega:
```bash
netlify deploy --prod
```

### Método 2: Netlify Drop

1. Ve a [Netlify Drop](https://app.netlify.com/drop)
2. Arrastra la carpeta del proyecto
3. ¡Listo!

### Método 3: Git Integration

1. Sube tu código a GitHub/GitLab/Bitbucket
2. Ve a [Netlify](https://app.netlify.com)
3. Click en "New site from Git"
4. Selecciona tu repositorio
5. Configuración de build:
   - **Build command**: (dejar vacío)
   - **Publish directory**: `.`
6. Click en "Deploy site"

### Método 4: Netlify CLI Directo

```bash
# Deploy directo
cd /ruta/a/tu/proyecto
netlify deploy --dir=. --prod
```

## 📝 Uso de la Aplicación

### Búsqueda

1. **Buscar por término**: Escribe en la barra de búsqueda (ej: "camino", "río", "monte")
2. **Buscar por definición**: La búsqueda también encuentra coincidencias en las definiciones
3. **Limpiar búsqueda**: Click en la X para limpiar

### Filtrado Alfabético

1. Click en cualquier letra para ver solo términos de esa letra
2. Click en "Todas" para ver todos los términos
3. Las letras sin términos aparecen deshabilitadas

### Ver Detalles

1. Click en cualquier tarjeta de término
2. Se abrirá un modal con la definición completa
3. Presiona ESC o click fuera del modal para cerrar

## 🎨 Personalización

### Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
    --color-primary: #2d5a4a;      /* Color principal */
    --color-secondary: #8b7355;    /* Color secundario */
    --color-accent: #d4a574;       /* Color de acento */
    /* ... más colores ... */
}
```

### Fuentes

Cambia las fuentes en `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=TU-FUENTE&display=swap" rel="stylesheet">
```

Y actualiza en `css/styles.css`:

```css
:root {
    --font-primary: 'TU-FUENTE', sans-serif;
    --font-display: 'TU-FUENTE-DISPLAY', serif;
}
```

## 📊 Datos

El archivo `data/glosario.json` contiene 314 términos estructurados:

```json
{
  "introduccion": "...",
  "terminos": [
    {
      "id": "abedular",
      "termino": "Abedular",
      "definicion": "Sitio poblado de abedules.",
      "letra": "A"
    }
  ]
}
```

### Agregar/Editar Términos

#### Opción 1: Usando el Admin (Recomendado)

1. Ve a `/admin` en tu sitio desplegado
2. Inicia sesión con Netlify Identity
3. Edita términos existentes o crea nuevos
4. **Paginación**: El admin carga términos de 20 en 20 para mejor rendimiento
5. **Filtros por letra**: Usa los filtros por letra para encontrar términos rápidamente
6. Al guardar, los cambios se commitean automáticamente
7. El script de build regenera `glosario.json` automáticamente en cada deploy

#### Opción 2: Editar Archivos Markdown Directamente

1. Edita archivos en `content/terminos/` (formato Markdown con frontmatter)
2. Ejecuta `npm run build` para regenerar `glosario.json`
3. Commit y push tus cambios

#### Opción 3: Editar JSON Manualmente (No Recomendado)

1. Edita `data/glosario.json` directamente
2. **IMPORTANTE**: En el próximo deploy, tus cambios se sobrescribirán
3. Es mejor usar las opciones 1 o 2

## ⚡ Optimizaciones

- **Lazy Loading**: Imágenes con carga diferida (si se agregan)
- **Minificación**: Netlify minifica automáticamente CSS/JS
- **Compresión**: Headers configurados para compresión gzip
- **Cache**: Estrategia de cache optimizada
- **Performance**: Puntuación Lighthouse 95+

## ♿ Accesibilidad

- ✅ Navegación por teclado completa
- ✅ Etiquetas ARIA apropiadas
- ✅ Contraste de color WCAG AA
- ✅ Semántica HTML5
- ✅ Focus visible para navegación por teclado

## 🐛 Solución de Problemas

### Los términos no cargan

- Verifica que `data/glosario.json` existe
- Abre la consola del navegador (F12) para ver errores
- Asegúrate de usar un servidor local (no file://)

### Estilos no se aplican

- Verifica la ruta en `index.html`: `<link rel="stylesheet" href="css/styles.css">`
- Limpia la cache del navegador (Ctrl+Shift+R)

### Búsqueda no funciona

- Abre la consola del navegador
- Verifica que `js/app.js` se carga correctamente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Si tienes preguntas o sugerencias, abre un issue en el repositorio.

## 🙏 Agradecimientos

- Datos del glosario: "Descripción de caminos.pdf" - Odotoponimia
- Iconos: SVG inline
- Fuentes: Google Fonts (Inter & Playfair Display)

---

Hecho con ❤️ para los amantes de la montaña y los caminos
