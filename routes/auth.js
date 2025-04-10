const express = require('express');
const login = require('../controllers/auth/loginController');
const register = require('../controllers/auth/registerController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;