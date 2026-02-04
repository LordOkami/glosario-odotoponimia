# Instrucciones para usar Netlify CMS con GitHub OAuth

¡El CMS está configurado con GitHub OAuth! Es 100% gratuito y estable.

## ✅ Requisitos:

- Cuenta de GitHub (gratuita): https://github.com/signup
- Ser colaborador del repositorio

## 🚀 Configuración rápida:

### Paso 1: Crear OAuth App en GitHub

Sigue las instrucciones detalladas en: **CONFIGURAR-GITHUB-OAUTH.md**

En resumen:
1. Ve a: https://github.com/settings/developers
2. Create **"New OAuth App"**
3. Usa estos datos:
   - Homepage URL: `https://glosario-odotoponimia.netlify.app`
   - Callback URL: `https://api.netlify.com/auth/done`
4. Copia Client ID y Client Secret

### Paso 2: Configurar en Netlify

1. Ve a Netlify Dashboard
2. Site configuration > Access control > OAuth
3. Install provider > GitHub
4. Pega Client ID y Client Secret

### Paso 3: Añadir colaboradores

1. Ve a: https://github.com/LordOkami/glosario-odotoponimia/settings/access
2. Add people
3. Añade los usuarios de GitHub

### Paso 4: Acceder al CMS

1. Ve a: https://glosario-odotoponimia.netlify.app/admin/
2. Click en "Login with GitHub"
3. Autoriza la aplicación
4. ¡Listo!

## 📝 Funcionalidades del CMS:

### Editar términos:
- Busca el término en la lista
- Haz los cambios
- Click en "Save" y luego "Publish"

### Añadir nuevos términos:
- Click en "Add Términos"
- Rellena todos los campos
- Click en "Save" y luego "Publish"

### Eliminar términos:
- Selecciona el término
- Click en "Delete entry"
- Confirma y publica

### Subir imágenes:
- En el campo "Imagen" puedes:
  - Arrastrar y soltar
  - Upload nueva imagen
  - Seleccionar imagen existente

## 💡 Ventajas de GitHub OAuth:

- 🆓 **100% Gratuito** - Sin límites ni pagos
- 🔒 **Seguro** - Autenticación de GitHub
- 📊 **Historial** - Todos los cambios en Git
- ⚡ **Estable** - No usa servicios deprecados
- 🎯 **Control** - Decides quién tiene acceso

## ⚠️ Notas importantes:

- Los cambios se guardan como commits en GitHub
- Cada cambio crea un nuevo deploy (1-2 minutos)
- Los colaboradores necesitan cuenta de GitHub
- Solo colaboradores del repo pueden acceder

## 🆘 Solución de problemas:

### No puedo hacer login:
1. ¿Eres colaborador del repositorio?
2. ¿Aceptaste la invitación de GitHub?
3. ¿La OAuth App está configurada en Netlify?

### Los cambios no se reflejan:
1. Espera 1-2 minutos para el deploy
2. Limpia caché del navegador (Ctrl+F5)
3. Verifica en Netlify > Deploys

### Error de configuración:
1. Revisa que la callback URL sea: `https://api.netlify.com/auth/done`
2. Verifica Client ID y Secret en Netlify
3. Limpia caché e intenta de nuevo

## 📚 Documentación completa:

- **Configuración detallada:** CONFIGURAR-GITHUB-OAUTH.md
- **Debug y solución de problemas:** DEBUG-CMS.md
- **Decap CMS (Netlify CMS):** https://decapcms.org/docs/

---

**¿Necesitas ayuda?** Revisa CONFIGURAR-GITHUB-OAUTH.md para instrucciones paso a paso.
