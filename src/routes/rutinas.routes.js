const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { crearRutina, obtenerRutinas, obtenerRutinaPorId, editarRutina } = require('../controllers/rutinas.controller');

// Ruta para crear una rutina (requiere estar autenticado)
router.post('/', authMiddleware, crearRutina);
router.get('/', authMiddleware, obtenerRutinas);
router.get('/:id', authMiddleware, obtenerRutinaPorId);
router:this.put('/:id', authMiddleware, editarRutina);

module.exports = router;