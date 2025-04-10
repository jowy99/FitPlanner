const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { registrarProgreso, verProgresoPorEjercicio, verHistorialProgreso } = require('../controllers/progreso.controller');

router.post('/', authMiddleware, registrarProgreso);
router.get('/ejercicio/:rutina_ejercicio_id', authMiddleware, verProgresoPorEjercicio);
router.get('/historial', authMiddleware, verHistorialProgreso);

module.exports = router;