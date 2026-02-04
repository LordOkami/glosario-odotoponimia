# Debug de Netlify CMS

## Error: "Failed to load settings from /.netlify/identity"

Este error significa que **Netlify Identity NO está habilitado** en tu sitio.

## Pasos para verificar y habilitar Identity:

### 1. Verifica el estado de Identity

1. Ve a: https://app.netlify.com
2. Haz click en tu sitio
3. En el menú lateral, busca **"Site configuration"** o **"Settings"**
4. Haz click en **"Identity"**

### 2. ¿Qué deberías ver?

#### Si Identity NO está habilitado:
Verás un botón grande que dice:
```
Enable Identity
```
👉 **HAZ CLICK EN ESE BOTÓN AHORA**

#### Si Identity YA está habilitado:
Verás una pantalla con:
- Registration preferences
- External providers
- Emails
- Services

### 3. Una vez habilitado Identity, configura Git Gateway:

1. En la misma pantalla de Identity
2. Desplázate hasta la sección **"Services"**
3. Busca **"Git Gateway"**
4. Si dice "Enable Git Gateway", **haz click en él**
5. Si ya dice "Enabled" o "Active", está bien

### 4. Configura Registration preferences:

1. En Identity, ve a **"Registration preferences"**
2. Cambia de "Open" a **"Invite only"**
3. Guarda los cambios

### 5. Invita usuarios:

1. En el menú principal de Netlify (no en Settings)
2. Haz click en **"Identity"** (en el menú lateral)
3. Haz click en **"Invite users"**
4. Añade los correos:
   - luissebastianhuerta@gmail.com
   - luis.sebastian.lorente@gmail.com

### 6. Espera el nuevo deploy:

Los cambios que acabo de subir necesitan un nuevo deploy:
1. Ve a **"Deploys"** en Netlify
2. Espera a que el deploy termine (1-2 minutos)
3. Verás un mensaje "Published" cuando esté listo

### 7. Limpia la caché del navegador:

**MUY IMPORTANTE:**
1. Presiona **Ctrl + Shift + Delete** (o Cmd + Shift + Delete en Mac)
2. Selecciona "Cached images and files"
3. Click en "Clear data"

O simplemente:
- Presiona **Ctrl + F5** (o Cmd + Shift + R en Mac) en la página /admin/

### 8. Intenta acceder nuevamente:

1. Ve a: `https://tu-sitio.netlify.app/admin/`
2. Deberías ver la pantalla de login de Netlify CMS

## ¿Sigues viendo el error?

### Verifica lo siguiente:

1. **¿Identity está realmente habilitado?**
   - Ve a Settings > Identity
   - Debe decir "Identity is enabled" o algo similar
   - NO debe haber un botón "Enable Identity"

2. **¿Git Gateway está habilitado?**
   - En Settings > Identity > Services
   - Git Gateway debe mostrar "Active" o "Enabled"

3. **¿El deploy terminó?**
   - Ve a Deploys
   - El deploy más reciente debe estar "Published"
   - Debe tener el commit "Simplify CMS configuration"

4. **¿Limpiaste la caché?**
   - Cierra todas las pestañas del sitio
   - Presiona Ctrl + Shift + Delete
   - Borra caché
   - Abre una ventana de incógnito
   - Intenta acceder a /admin/

## Checklist de verificación:

- [ ] Identity está habilitado en Netlify (Settings > Identity)
- [ ] Git Gateway está habilitado (Settings > Identity > Services)
- [ ] Registration está en "Invite only"
- [ ] He invitado a los usuarios desde el menú Identity
- [ ] El último deploy está "Published"
- [ ] He limpiado la caché del navegador
- [ ] Estoy accediendo a https://MI-SITIO.netlify.app/admin/ (no localhost)

## Si todo está marcado y sigue sin funcionar:

Envíame un screenshot de:
1. Settings > Identity (toda la pantalla)
2. Settings > Identity > Services (sección de Git Gateway)
3. El error exacto que ves en /admin/

## Consola del navegador:

Abre las DevTools (F12) y mira la pestaña "Console".
Copia cualquier error que veas en rojo y envíamelo.
