# Grand Chess Auto

Proyecto web de ajedrez en línea con **Node.js**, **Express**, **MongoDB** y frontend en **HTML, CSS y JavaScript**. El desarrollo se realizó en colaboración con [Francisco Piñera](https://github.com/BurnedGpu)
  de manera iterativa en tres fases, incrementando funcionalidad en cada etapa.

---

## Fases del proyecto

### Fase 1 – Interfaz y navegación
- Desarrollo de la interfaz web con páginas de inicio, registro, perfil, historial de partidas y tablero de ajedrez.  
- Navegación entre todas las páginas mediante enlaces.  
- Diseño responsivo (1728x864 a 1920x1080) con animaciones CSS.  
- HTML y CSS validados con linters.

### Fase 2 – Tablero interactivo y autenticación básica
- Tablero de ajedrez con **drag & drop**, registro de movimientos y gestión de turnos.  
- Bandeja de piezas capturadas con animaciones.  
- Persistencia del juego en el navegador al cerrar y abrir la sesión.  
- Registro y login de usuarios en memoria, acceso restringido a jugadores autenticados.  
- Servidor Express para servir la aplicación.  
- Validación de HTML, CSS y JavaScript con linters.

### Fase 3 – Juego en línea y gestión de partidas
- Sistema completo de usuarios con autenticación mediante cookies y MongoDB.  
- Creación, invitación, acceso y eliminación de partidas.  
- Juego en línea entre dos jugadores con actualización periódica del tablero desde la base de datos.  
- Backend con API para la lógica del juego y frontend que consume la API mediante fetch.  
- Ejecución persistente con **pm2**.  

---

## Tecnologías utilizadas
- **Frontend:** HTML, CSS, JavaScript puro.  
- **Backend:** Node.js, Express.js.  
- **Base de datos:** MongoDB (fase 3).  
- **Gestión de procesos:** pm2.  
- **Dependencias principales:** nodemon (desarrollo), bcrypt (hash de contraseñas), express-session.  
