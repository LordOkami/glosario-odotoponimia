# Configurar GitHub OAuth para el CMS

## 📋 Pasos para configurar GitHub OAuth:

### 1. Crear OAuth App en GitHub

1. Ve a GitHub y abre: https://github.com/settings/developers
2. En el menú lateral, haz click en **"OAuth Apps"**
3. Click en **"New OAuth App"** (botón verde)

### 2. Completar el formulario:

Rellena con estos datos **EXACTOS**:

- **Application name:** `Glosario Odotoponimia CMS`
- **Homepage URL:** `https://glosario-odotoponimia.netlify.app`
- **Application description:** (opcional) `CMS para gestionar el glosario`
- **Authorization callback URL:** `https://api.netlify.com/auth/done`

⚠️ **IMPORTANTE:** La callback URL debe ser **exactamente** `https://api.netlify.com/auth/done`

4. Click en **"Register application"**

### 3. Obtener credenciales:

Después de crear la app, verás:

- **Client ID:** (una cadena como `Iv1.a1b2c3d4e5f6g7h8`)
- **Client Secret:** Click en **"Generate a new client secret"**

⚠️ **COPIA AMBOS VALORES** - los necesitarás en el siguiente paso.

### 4. Configurar en Netlify:

1. Ve a tu dashboard de Netlify: https://app.netlify.com
2. Selecciona tu sitio (glosario-odotoponimia)
3. Ve a **Site configuration** > **Access control** > **OAuth**
4. En la sección **"Authentication providers"**, click en **"Install provider"**
5. Selecciona **GitHub**
6. Pega:
   - **Client ID:** (el que copiaste de GitHub)
   - **Client Secret:** (el que copiaste de GitHub)
7. Click en **"Install"**

### 5. Añadir colaboradores al repositorio:

Los usuarios que quieres que accedan al CMS deben ser colaboradores del repositorio:

1. Ve a: https://github.com/LordOkami/glosario-odotoponimia
2. Click en **Settings** (del repositorio)
3. En el menú lateral, click en **Collaborators**
4. Click en **"Add people"**
5. Busca y añade los usuarios por su username de GitHub

**Usuarios a añadir:**
- Usuario de luissebastianhuerta@gmail.com (su username de GitHub)
- Usuario de luis.sebastian.lorente@gmail.com (su username de GitHub)

⚠️ **Necesitas saber sus usernames de GitHub**. Si no los tienen, que creen cuentas en https://github.com/signup

### 6. Los colaboradores aceptan la invitación:

1. Cada usuario recibirá un email de GitHub
2. Deben hacer click en "Accept invitation"
3. O pueden ir directamente a: https://github.com/LordOkami/glosario-odotoponimia/invitations

### 7. ¡Listo! Probar el CMS:

1. Ve a: https://glosario-odotoponimia.netlify.app/admin/
2. Verás un botón **"Login with GitHub"**
3. Click en el botón
4. Autoriza la aplicación
5. ¡Ya estás dentro del CMS!

## 🔐 Permisos:

Con GitHub OAuth:
- ✅ Los colaboradores pueden editar el glosario
- ✅ Los cambios se guardan como commits en GitHub
- ✅ Puedes ver el historial de cambios
- ✅ Control total sobre quién tiene acceso

## ❓ Solución de problemas:

### Error: "Failed to load config.yml"
- Verifica que la OAuth App esté configurada en Netlify
- Revisa que la callback URL sea exactamente: `https://api.netlify.com/auth/done`

### Error: "Not Found"
- Verifica que el usuario sea colaborador del repositorio
- El usuario debe aceptar la invitación primero

### No veo el botón "Login with GitHub"
- Limpia la caché del navegador (Ctrl + Shift + Delete)
- Prueba en ventana de incógnito
- Espera a que el deploy termine en Netlify

## 📝 Resumen de URLs importantes:

- **Crear OAuth App:** https://github.com/settings/developers
- **Repositorio:** https://github.com/LordOkami/glosario-odotoponimia
- **Añadir colaboradores:** https://github.com/LordOkami/glosario-odotoponimia/settings/access
- **CMS:** https://glosario-odotoponimia.netlify.app/admin/
- **Netlify Dashboard:** https://app.netlify.com

## ✨ Ventajas de GitHub OAuth:

- 🆓 Completamente gratis
- 🔒 Más seguro
- 📊 Historial de cambios visible en GitHub
- ⚡ No usa servicios deprecados
- 🎯 Control fino de permisos

---

**¿Necesitas ayuda?** Revisa que todos los pasos estén completos en orden.
