require('dotenv').config();
const express = require('express');
const { crearBaseDeDatosSiNoExiste } = require('./config/db');
const { ejecutarMigraciones } = require('./config/migrations');
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios.routes');
const rutinasRoutes = require('./routes/rutinas.routes');
const configuracionRoutes = require('./routes/configuracion.routes');
const progressRoutes = require('./routes/progreso.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use('/api/configuracion', configuracionRoutes);
app.use('/api/progreso', progressRoutes);

(async () => {
  try {
    await crearBaseDeDatosSiNoExiste();

    // Ahora que la DB existe, importamos pool
    const db = require('./config/db');

    app.use(express.json());

    // Prueba de conexión
    app.get('/prueba-db', async (req, res) => {
      const resultado = await db.query('SELECT NOW()');
      res.json({ hora: resultado.rows[0].now });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor FitPlanner activo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('⛔ No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
})();

(async () => {
    await crearBaseDeDatosSiNoExiste();
    await ejecutarMigraciones(); // <-- Aquí llamas a todas tus migraciones
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })();