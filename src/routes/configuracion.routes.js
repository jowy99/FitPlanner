const express = require('express');
const router = express.Router();
const { configurarEjercicio } = require('../controllers/configuracion.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, configurarEjercicio);

module.exports = router;