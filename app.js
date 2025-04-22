require('dotenv').config();
const express = require('express');
const { crearBaseDeDatosSiNoExiste } = require('./config/db');
const { ejecutarMigraciones } = require('./config/migrations');
const { ejecutarSeeds } = require('./config/seeds');
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const rutinasRoutes = require('./routes/rutinas');
const configuracionRoutes = require('./routes/configuracion.routes');
const progressRoutes = require('./routes/progreso');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use('/api/configuracion', configuracionRoutes);
app.use('/api/progreso', progressRoutes);

(async () => {
  try {
    await crearBaseDeDatosSiNoExiste();
    await ejecutarMigraciones();
    await ejecutarSeeds();

    app.get('/{*splat}', (req, res) => {
      if (!req.originalUrl.startsWith('/api')) {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
      }
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor FitPlanner activo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('⛔ No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
})();