const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const registrarProgreso = require('../controllers/progreso/registrarProgresoController');
const verProgresoPorEjercicio = require('../controllers/progreso/verProgresoPorEjercicioController');
const verHistorialProgreso = require('../controllers/progreso/verHistorialProgresoController');

router.post('/', authMiddleware, registrarProgreso);
router.get('/ejercicio/:rutina_ejercicio_id', authMiddleware, verProgresoPorEjercicio);
router.get('/historial', authMiddleware, verHistorialProgreso);

module.exports = router;