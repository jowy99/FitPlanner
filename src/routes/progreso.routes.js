const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { registrarProgreso, verProgresoPorEjercicio } = require('../controllers/progreso.controller');

router.post('/', authMiddleware, registrarProgreso);
router.get('/ejercicio/:rutina_ejercicio_id', authMiddleware, verProgresoPorEjercicio);

module.exports = router;