# HYROX Training System

Aplicación web mobile-first para HYROX, fuerza y running, publicada como sitio estático en GitHub Pages.

## Funciones

- Dashboard y plan semanal.
- Registro e historial de sesiones y check-ins de recuperación.
- Cuenta con correo y contraseña mediante Supabase Auth.
- Sincronización entre dispositivos en PostgreSQL.
- Privacidad por usuario mediante Row Level Security (RLS).

## Configurar Supabase (requerido para activar cuentas)

1. Creá un proyecto en [Supabase](https://supabase.com/dashboard).
2. En **SQL Editor**, ejecutá el contenido de `supabase/schema.sql`.
3. En **Project Settings → API**, copiá la Project URL y la publishable key (o legacy anon key). Nunca uses la service_role/secret key en el navegador.
4. En `index.html`, reemplazá `SUPABASE_URL` y `SUPABASE_ANON_KEY` por esos dos valores públicos.
5. En **Authentication → URL Configuration**, agregá la URL de GitHub Pages a Site URL y Redirect URLs: `https://ballestomi02-bot.github.io/hyrox-training-system/`.
6. En **Authentication → Providers → Email**, habilitá email/password. Para validar el registro, dejá activada la confirmación de correo y configurá el proveedor SMTP de producción; el correo de prueba integrado de Supabase tiene límites.
7. Guardá y publicá `index.html` en GitHub Pages. La pantalla de registro/login se habilita al cargar la URL y la clave. Mientras haya placeholders, la app informa que falta configuración.

El registro es abierto por defecto: cualquiera con el enlace puede crear una cuenta. Para limitarlo a amigos, desactivá **Authentication → Settings → Allow new users to sign up** y creá/invitá usuarios desde el panel de Supabase.

## Datos y migración

La tabla `training_data` guarda el estado de cada usuario en una fila, protegida por políticas RLS que comparan `auth.uid()` con `user_id`. Un usuario autenticado solo puede leer y modificar su propia fila. No hay clave de servicio ni secreto en el frontend.

Al primer inicio de sesión, los datos legacy del navegador se importan si esa cuenta todavía no tiene datos en la nube. Tras una importación correcta, la copia legacy local se elimina para evitar que otra cuenta en el mismo navegador importe esos registros. Si ya hay datos en la nube, se usan esos datos.

## Uso local

Abrí la app desde GitHub Pages o servila en localhost con un servidor estático. Abrir el archivo directamente puede impedir que el módulo de Supabase cargue.

## Instalar en iPhone

La app se puede agregar a la pantalla de inicio desde Safari; no hace falta Mac ni App Store para usarla de esta manera:

1. Abrí `https://ballestomi02-bot.github.io/hyrox-training-system/` en Safari del iPhone.
2. Tocá **Compartir**.
3. Elegí **Agregar a pantalla de inicio** y confirmá **Agregar**.

Se abrirá en una ventana propia y tendrá el ícono de HYROX. La primera carga necesita conexión. La app conserva un shell básico en caché, pero iniciar sesión y sincronizar entrenamientos requiere internet.

