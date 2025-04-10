const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { crearRutina, obtenerRutinas } = require('../controllers/rutinas.controller');

// Ruta para crear una rutina (requiere estar autenticado)
router.post('/', authMiddleware, crearRutina);
router.get('/', authMiddleware, obtenerRutinas);

module.exports = router;