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

## Configurar Supabase (requerido para cuentas y nube)

1. Creá un proyecto en [Supabase](https://supabase.com/dashboard).
2. En **SQL Editor**, ejecutá el contenido de `supabase/schema.sql`.
3. En **Project Settings → API**, copiá la Project URL y la publishable key (o legacy anon key). Nunca uses la service_role/secret key en el navegador.
4. En `index.html`, reemplazá `SUPABASE_URL` y `SUPABASE_ANON_KEY` por esos dos valores públicos.
5. En **Authentication → URL Configuration**, agregá `https://ballestomi02-bot.github.io/hyrox-training-system/` en Site URL y Redirect URLs.
6. En **Authentication → Providers → Email**, habilitá email/password. Para validar registros en producción, configurá SMTP.
7. Publicá `index.html` en GitHub Pages. Con los placeholders actuales, registro e inicio de sesión permanecen deshabilitados.

El registro es abierto por defecto: quien tenga el enlace puede crear una cuenta. Para invitar solo a amigos, desactivá **Allow new users to sign up** en Authentication Settings y administrá las cuentas desde Supabase.

## Datos y privacidad

La tabla `training_data` almacena el estado de cada usuario en una fila con políticas RLS que requieren que `auth.uid()` coincida con `user_id`. No hay clave de servicio ni secreto en el frontend. El progreso antiguo del navegador se importa al iniciar sesión si la cuenta aún no tiene datos en la nube.

## Instalar en iPhone mientras se prepara App Store

La versión web puede agregarse desde Safari con **Compartir → Agregar a pantalla de inicio**. Eso crea un acceso de pantalla de inicio; no es una descarga de App Store. Para publicar en App Store hay que empaquetar esta app para iOS, compilarla en macOS en la nube y completar el proceso de Apple Developer.

## Referencias de producto

Las funciones generales se inspiraron en patrones publicados por [Nike Training Club](https://www.nike.com/help/a/ntc-info/app), [Hevy](https://www.hevyapp.com/features/track-exercises/) y el [Training Log de Strava](https://support.strava.com/en-us/articles/15402077-training-log). No se reutilizan sus marcas ni recursos visuales.
