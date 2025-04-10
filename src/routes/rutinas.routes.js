const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { crearRutina, obtenerRutinas, obtenerRutinaPorId, editarRutina, eliminarRutina, añadirEjercicioARutina } = require('../controllers/rutinas.controller');

// Ruta para crear una rutina (requiere estar autenticado)
router.post('/', authMiddleware, crearRutina);
router.get('/', authMiddleware, obtenerRutinas);
router.get('/:id', authMiddleware, obtenerRutinaPorId);
router.put('/:id', authMiddleware, editarRutina);
router.delete('/:id', authMiddleware, eliminarRutina);
router.post('/ejercicio', authMiddleware, añadirEjercicioARutina);

module.exports = router;