const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const esAdminMiddleware = require('../middleware/esAdminMiddleware');
const listarUsuarios = require('../controllers/usuarios/listarUsuariosController');
const obtenerPerfil = require('../controllers/usuarios/obtenerPerfilController');

router.get('/', authMiddleware, esAdminMiddleware, listarUsuarios);
router.get('/perfil', authMiddleware, obtenerPerfil);

module.exports = router;