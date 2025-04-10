const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const crearRutina = require('../controllers/rutinas/crearRutinaController');
const obtenerRutinas = require('../controllers/rutinas/obtenerRutinasController');
const obtenerRutinaID = require('../controllers/rutinas/obtenerRutinaIDController');
const editarRutina = require('../controllers/rutinas/editarRutinaController');
const eliminarRutina = require('../controllers/rutinas/eliminarRutinaController');
const aniadirEjercicioRutina = require('../controllers/rutinas/aniadirEjercicioRutinaController');
const eliminarEjercicioRutina = require('../controllers/rutinas/eliminarEjercicioRutinaController');

// Ruta para crear una rutina (requiere estar autenticado)
router.post('/', authMiddleware, crearRutina);
router.get('/', authMiddleware, obtenerRutinas);
router.get('/:id', authMiddleware, obtenerRutinaID);
router.put('/:id', authMiddleware, editarRutina);
router.delete('/:id', authMiddleware, eliminarRutina);
router.post('/ejercicio', authMiddleware, aniadirEjercicioRutina);
router.delete('/ejercicio/:id', authMiddleware, eliminarEjercicioRutina);

module.exports = router;