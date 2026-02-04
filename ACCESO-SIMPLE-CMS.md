# Acceso Simple al CMS - SIN OAuth ni complicaciones

## 🎯 Configuración SUPER SIMPLE para 2 personas

### PASO 1: Crear un Personal Access Token en GitHub (1 minuto)

1. **Abre:** https://github.com/settings/tokens
2. **Click en:** "Generate new token" > "Generate new token (classic)"
3. **Rellena:**
   - Note: `CMS Glosario`
   - Expiration: `No expiration` (o el que prefieras)
   - **Marca SOLO esta casilla:** ✅ **repo** (esto da acceso completo al repositorio)
4. **Scroll abajo y click:** "Generate token"
5. **COPIA EL TOKEN** (aparece una vez sola, algo como `ghp_abc123...`)

⚠️ **GUARDA ESTE TOKEN** - es tu "contraseña" para el CMS

---

### PASO 2: Acceder al CMS

1. **Ve a:** https://glosario-odotoponimia.netlify.app/admin/

2. **Te pedirá el token**

3. **Pega el token que copiaste**

4. **¡Listo! Ya estás dentro**

---

### PASO 3: Para la segunda persona (opcional)

**Opción A - Compartir el mismo token:**
- Simplemente dale el token a la otra persona
- Ambos pueden usarlo

**Opción B - Token individual:**
- La otra persona crea su propio token (siguiendo PASO 1)
- Cada uno usa su propio token

---

## 🔐 Seguridad del Token

- Guarda el token en un lugar seguro (gestor de contraseñas)
- No lo compartas públicamente
- Si lo pierdes, crea uno nuevo en GitHub
- Puedes revocarlo en cualquier momento: https://github.com/settings/tokens

---

## ✅ Ventajas de este método:

- 🚀 **Super simple** - Solo copiar/pegar un token
- 💰 **100% gratis** - Sin pagos
- 🔒 **Seguro** - Control total desde GitHub
- ⚡ **Rápido** - No hay OAuth ni configuraciones complejas
- 👥 **Perfecto para 2 personas** - Sin complicaciones

---

## 🆘 Solución de problemas:

### "Invalid token" o "Authentication failed"
- Verifica que el token tenga el scope **repo** marcado
- Crea un nuevo token si el anterior expiró
- Asegúrate de copiar el token completo

### "Permission denied"
- El token necesita el scope **repo** completo
- Crea un nuevo token y marca la casilla **repo**

### Token perdido
- No problem, crea uno nuevo: https://github.com/settings/tokens
- Revoca el anterior si quieres

---

## 📝 Resumen:

1. Crea token en GitHub: https://github.com/settings/tokens
2. Marca scope: **repo**
3. Copia el token
4. Ve a /admin/ y pega el token
5. ¡Done!

**Eso es TODO.** Nada de OAuth, nada de configuraciones en Netlify, nada de complicaciones.
