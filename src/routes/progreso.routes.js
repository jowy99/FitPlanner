const express = require('express');
const router = express.Router();
const { registrarProgreso } = require('../controllers/progreso.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, registrarProgreso);

module.exports = router;