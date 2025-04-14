const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Controllers
const crearRutina = require('../controllers/rutinas/crearRutinaController');
const obtenerRutinas = require('../controllers/rutinas/obtenerRutinasController');
const obtenerRutinaPorId = require('../controllers/rutinas/obtenerRutinaIDController');
const editarRutina = require('../controllers/rutinas/editarRutinaController');
const eliminarRutina = require('../controllers/rutinas/eliminarRutinaController');
const agregarEjercicioARutina = require('../controllers/rutinas/aniadirEjercicioRutinaController');
const eliminarEjercicioDeRutina = require('../controllers/rutinas/eliminarEjercicioRutinaController');

// Rutas
router.post('/crear', authMiddleware, crearRutina);
router.get('/obtener', authMiddleware, obtenerRutinas);
router.get('/:rutina_id', authMiddleware, obtenerRutinaPorId);
router.put('/:rutina_id', authMiddleware, editarRutina);
router.delete('/:rutina_id', authMiddleware, eliminarRutina);
router.post('/:rutina_id/ejercicio', authMiddleware, agregarEjercicioARutina);
router.delete('/:rutina_id/ejercicio/:ejercicio_id', authMiddleware, eliminarEjercicioDeRutina);

module.exports = router;