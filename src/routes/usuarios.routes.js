const express = require('express');
const router = express.Router();
const { listarUsuarios, obtenerPerfil } = require('../controllers/usuarios.controller');
const authMiddleware = require('../middleware/authMiddleware');
const esAdminMiddleware = require('../middleware/esAdminMiddleware');

router.get('/', authMiddleware, esAdminMiddleware, listarUsuarios);
router.get('/perfil', authMiddleware, obtenerPerfil);

module.exports = router;