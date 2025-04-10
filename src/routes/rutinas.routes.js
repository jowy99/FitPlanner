const express = require('express');
const router = express.Router();
const { crearRutina } = require('../controllers/rutinas.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para crear una rutina (requiere estar autenticado)
router.post('/', authMiddleware, crearRutina);

module.exports = router;