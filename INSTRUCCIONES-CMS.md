# Instrucciones para configurar Netlify CMS

¡Todo está listo! Ahora necesitas configurar Netlify Identity para poder acceder al CMS.

## Pasos para configurar Netlify CMS:

### 1. Habilitar Git Gateway en Netlify

1. Ve a tu dashboard de Netlify: https://app.netlify.com
2. Selecciona tu sitio (glosario-odotoponimia)
3. Ve a **Settings** > **Identity**
4. Click en **Enable Identity**
5. Una vez habilitado, ve a **Settings** > **Identity** > **Services** > **Git Gateway**
6. Click en **Enable Git Gateway**

### 2. Configurar usuarios permitidos

1. En **Settings** > **Identity** > **Registration**
2. Cambia de "Open" a **Invite only** (solo por invitación)
3. Ve a la pestaña **Identity** en el menú principal
4. Click en **Invite users**
5. Añade los correos electrónicos:
   - luissebastianhuerta@gmail.com
   - luis.sebastian.lorente@gmail.com

### 3. Aceptar la invitación

1. Revisa tu correo electrónico
2. Haz click en el enlace de invitación
3. Crea una contraseña para tu cuenta

### 4. Acceder al CMS

Una vez configurado todo:

1. Ve a: **https://tu-sitio.netlify.app/admin/**
2. Inicia sesión con tu correo y contraseña
3. ¡Ya puedes editar el glosario!

## Funcionalidades del CMS:

### Editar términos existentes:
- Click en "Glosario" > "Términos del Glosario"
- Busca el término que quieres editar
- Haz los cambios necesarios
- Click en "Save" y luego "Publish"

### Añadir nuevos términos:
- Click en "Glosario" > "Términos del Glosario"
- Scroll hasta el final de la lista de términos
- Click en "Add Términos"
- Rellena todos los campos:
  - **ID**: identificador único (minúsculas, sin acentos, con guiones)
  - **Término**: nombre del término
  - **Definición**: definición completa
  - **Letra**: selecciona la letra correspondiente
  - **Imagen**: (opcional) sube una imagen
- Click en "Save" y luego "Publish"

### Eliminar términos:
- Click en el término que quieres eliminar
- Click en "Delete entry"
- Confirma la eliminación
- Click en "Publish"

### Subir imágenes:
- Cuando edites un término, en el campo "Imagen" puedes:
  - Arrastrar y soltar una imagen
  - Click en "Choose an image" para seleccionar del servidor
  - Click en "Upload" para subir una nueva imagen

## Notas importantes:

- Los cambios se guardan como commits en GitHub
- Cada vez que publicas cambios, se actualiza automáticamente el sitio
- El deploy puede tardar 1-2 minutos en completarse
- Puedes ver el historial de cambios en GitHub

## Solución de problemas:

### No puedo acceder a /admin/
- Verifica que Git Gateway esté habilitado
- Asegúrate de que Identity esté activado
- Limpia la caché del navegador

### Los cambios no se reflejan:
- Espera 1-2 minutos para el deploy
- Verifica en Netlify > Deploys que el deploy se completó
- Limpia la caché del navegador (Ctrl+F5)

### Error de autenticación:
- Verifica que tu correo esté en la lista de usuarios invitados
- Resetea tu contraseña si es necesario

## ¿Necesitas ayuda?

Contacta con el administrador o revisa la documentación oficial:
https://www.netlifycms.org/docs/
