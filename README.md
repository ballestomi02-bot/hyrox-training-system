# HYROX Training

App de entrenamiento mobile-first para HYROX, fuerza y running. La interfaz combina una pantalla de progreso semanal, un registro de sesión centrado en ejercicios y series, e historial visual de actividad. El idioma es español; el nombre se mantiene temporalmente.

## Qué incluye

- Inicio con actividad semanal, sesiones recientes, distancia y minutos.
- Catálogo inicial de programas para HYROX desde cero, motor HYROX, preparación individual, dobles, running 5K y fuerza base.
- Selección de un programa activo y acceso a sus sesiones semanales.
- Editor para armar y guardar entrenamientos propios con ejercicios, series y repeticiones.
- Modo de sesión con carga/repeticiones por serie, marcas de series completadas, RPE, tiempo y distancia para running.
- Historial visual con resumen semanal y filtros por HYROX, running y fuerza.
- Check-ins de recuperación para sueño, energía, fatiga, estrés y molestias.
- Cuentas y sincronización privada con Supabase Auth + Postgres RLS (requiere configuración; ver abajo).

La presentación aplica ideas habituales de apps de entrenamiento como programas por objetivo, seguimiento de ejercicios/series y un calendario visual de actividad. El diseño propio usa fondo claro, tipografía negra y acentos verde oliva.

## Cuentas privadas por invitación

El sitio está conectado a Supabase. La URL del proyecto y la clave **publishable** están en el cliente web; esa clave es pública por diseño. No hay ninguna clave `secret` ni `service_role` en el código.

La tabla `training_data` y sus políticas RLS están configuradas para que cada usuario solo pueda leer y modificar sus propios entrenamientos y check-ins. El registro público está desactivado; el acceso es por cuentas que crea el administrador.

### Crear una cuenta para un amigo

1. En Supabase, abrí **Authentication → Users → Add user → Create new user** (no “Send invitation”, que envía un correo).
2. Ingresá el correo de tu amigo, asignale una contraseña inicial y dejá marcado **Auto Confirm User**.
3. Pasale esa contraseña inicial por un canal privado. No la pongas en GitHub, en el código ni en este chat.
4. Tu amigo inicia sesión en la app y toca el ícono de llave para cambiarla por una contraseña propia.

Si alguien olvida su contraseña, por ahora vas a tener que restablecerla desde **Authentication → Users** en Supabase; el envío de recuperación por correo requiere configurar SMTP. El SMTP no está configurado y no hace falta para crear cuentas manualmente.

La URL del sitio está configurada en Supabase:

- Sitio: `https://ballestomi02-bot.github.io/hyrox-training-system/`
- Proveedor de acceso: correo y contraseña.
- Confirmación de email: permanece habilitada para el registro normal; las cuentas creadas por el administrador deben marcarse como confirmadas.

## Datos y privacidad

La tabla `training_data` almacena el estado de cada usuario en una fila con políticas RLS que requieren que `auth.uid()` coincida con `user_id`. No hay clave de servicio ni secreto en el frontend. El progreso antiguo del navegador se importa al iniciar sesión si la cuenta aún no tiene datos en la nube.

## App iOS y publicación en App Store

El proyecto incluye un contenedor nativo iOS basado en Capacitor y una compilación de prueba automática en GitHub Actions. El workflow genera una app para **iOS Simulator** y la guarda como artifact. Ese archivo sirve para verificar la compilación en el simulador; no se puede instalar en un iPhone ni subir a App Store.

Para preparar la compilación de la app nativa, el workflow usa GitHub Actions en macOS. Capacitor requiere macOS y Xcode para los proyectos iOS; las versiones actuales de Capacitor 8 requieren Node.js 22 y Xcode 26 o superior.

La autenticación nativa usa el esquema de retorno `hyroxtraining://auth-callback`. Al configurar Supabase, agregá ese URL exacto a **Authentication → URL Configuration → Redirect URLs**. La app sigue usando credenciales públicas (Project URL y publishable/anon key); cargalas como variables de repositorio en **Settings → Secrets and variables → Actions → Variables** con los nombres `SUPABASE_URL` y `SUPABASE_ANON_KEY`. La publishable/anon key no es una contraseña y puede ir como variable; nunca uses la service-role key en el teléfono ni en el frontend.

El identificador de paquete `com.ballestomi02.hyroxtraining` y el nombre `HYROX Training` son provisionales. Antes de distribuir hay que confirmar un Bundle ID disponible, inscribirse en Apple Developer Program, configurar firma de distribución y App Store Connect, preparar icono/capturas definitivos y completar la revisión de Apple. La compilación de simulador no es una publicación. El workflow aún no firma ni sube a TestFlight/App Store; no se han configurado certificados, perfiles ni credenciales de Apple.

## Versión web en iPhone

La versión web también puede agregarse desde Safari con **Compartir → Agregar a pantalla de inicio**. Eso crea un acceso web y es distinto de la app nativa que se distribuirá por App Store.

## Referencias de producto

Las funciones generales se inspiraron en patrones publicados por [Nike Training Club](https://www.nike.com/help/a/ntc-info/app), [Hevy](https://www.hevyapp.com/features/track-exercises/) y el [Training Log de Strava](https://support.strava.com/en-us/articles/15402077-training-log). No se reutilizan sus marcas ni recursos visuales.
