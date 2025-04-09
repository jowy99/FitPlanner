# 🛡️ FitPlanner Backend - Sistema de Autenticación y Gestión de Usuarios

Este proyecto representa la base de un sistema profesional de autenticación y autorización, ideal para escalar hacia una aplicación completa como un planificador de comidas, rutinas de entrenamiento u otro SaaS.

> ⚙️ Construido con seguridad, escalabilidad y buenas prácticas en mente.

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **PostgreSQL** con conexión vía `pg`
- **bcrypt** para hash de contraseñas
- **JWT** (`jsonwebtoken`) para autenticación segura
- **dotenv** para variables de entorno
- **UUID** para IDs únicos seguros
- Validaciones con `express-validator` (a implementar)
- [DBngin](https://dbngin.com/) para entorno local de PostgreSQL (recomendado)

---

## 📁 Estructura del proyecto

src/
├── config/             # Conexión y migraciones de la base de datos
├── controllers/        # Lógica de negocio (auth y usuarios)
├── middlewares/        # Autenticación y autorización
├── routes/             # Definición de rutas
└── app.js              # Punto de entrada principal

---

## 🧠 Funcionalidades actuales

### ✅ Registro de usuarios (`POST /api/auth/register`)
- Almacena `nombre`, `email`, `contraseña`
- Contraseña encriptada con `bcrypt`
- Rol por defecto: `usuario`

### ✅ Login (`POST /api/auth/login`)
- Genera un **token JWT**
- Devuelve datos básicos del usuario autenticado
- Expiración configurable (1h por defecto)

### ✅ Perfil del usuario (`GET /api/usuarios/perfil`)
- Requiere token
- Devuelve solo la información del usuario autenticado

### ✅ Listado de usuarios (`GET /api/usuarios`)
- Solo accesible para usuarios con rol `admin`
- Protegido con doble verificación:
  - Middleware `authMiddleware` (JWT)
  - Middleware `esAdmin` (rol desde base de datos en tiempo real)

---

## 🔐 Seguridad implementada

- ✅ Hash seguro de contraseñas con `bcrypt`
- ✅ Tokens firmados y con expiración
- ✅ Rutas protegidas con middlewares
- ✅ Verificación del rol **directamente desde la base de datos** en cada acceso crítico
- ✅ Estructura escalable para añadir:
  - Refresh tokens
  - Rate limiting
  - 2FA
  - Logs de actividad

---

## 🔧 Variables de entorno `.env`

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_clave
DB_NAME=fitplanner
JWT_SECRET=tu_super_secreto_seguro
JWT_EXPIRES_IN=1h

---

## 🛠 Comandos útiles

### Iniciar el servidor

```bash
pnpm dev
```

## ⚙️ Operaciones automáticas

### 🛠 Crear la base de datos (si no existe)
Automáticamente al iniciar el servidor, gracias a la función `crearBaseDeDatosSiNoExiste`.

### 🧱 Ejecutar migraciones
Automático al arrancar el servidor. Incluye:
- Creación de tabla `usuarios`
- Activación de extensión `pgcrypto` para UUIDs

---

## 🔮 Próximas funcionalidades

- [ ] Validación avanzada de datos con `express-validator`
- [ ] Sistema de **refresh tokens** para mantener sesiones activas
- [ ] Edición y eliminación de usuarios (con control de permisos)
- [ ] Dashboard de administrador
- [ ] Módulos personalizados:
  - Rutinas de entrenamiento
  - Registro de comidas
  - Estadísticas y progreso visual

---

## 👨‍💻 Autor

Desarrollado por **Joel Arnaud**.

---

## 🛡️ Licencia

Este proyecto está disponible para fines **personales y educativos**.  
Para uso comercial o redistribución, por favor contacta con el autor.