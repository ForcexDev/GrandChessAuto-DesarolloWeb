# Entregable Fase 3

En esta tercera fase, se ha ampliado la aplicación web de ajedrez para permitir **jugar en línea entre dos usuarios**, incorporando un **sistema completo de autenticación** y la gestión básica de partidas.

**Características:**
- Registro de usuarios y almacenamiento seguro de contraseñas (hash con bcrypt o argon2).
- Inicio y cierre de sesión mediante cookies de sesión.
- Creación de partidas con identificador único y selección de color.
- Invitación a jugadores mediante enlace; acceso restringido a participantes.
- Acceso y eliminación de partidas solo por los usuarios autorizados.
- Juego en línea con actualización del tablero cada 5 segundos desde la base de datos MongoDB.
- Interfaz con páginas Handlebars servidas por Express, manteniendo coherencia con fases anteriores.
- Backend en Node.js + Express, con API para funciones del tablero y lógica de juego.
- Frontend sin frameworks, consumo de API vía fetch y soporte opcional de librerías UI ligeras como Bootstrap.
- Notificación al jugador sobre su turno y confirmación antes de eliminar partidas.
- Ejecución persistente con pm2 para garantizar disponibilidad del servidor.

**Nota:**
Se mantiene el enfoque de no usar frameworks de frontend completos (React/Vue/Angular), priorizando HTML, CSS, JavaScript y consumo de API para la lógica de juego.

