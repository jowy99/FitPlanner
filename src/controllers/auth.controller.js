const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const pool = require('../config/db').pool;

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validamos que lleguen ambos campos
        if(!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña obligatorios.' });
        }

        // Buscar el usuario por ID
        const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if(resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const usuario = resultado.rows[0];

        // Comprarar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if(!passwordValido) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        delete usuario.password;

        res.json({
            mensaje: 'Login exitoso',
            usuario,
            token
        })
    } catch (error) {
        console.error('Error en login', error.message);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}

const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        if(!nombre || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        
        const existe = await pool.query('SELECT 1 FROM usuarios WHERE email = $1', [email]);
        if(existe.rowCount > 0) {
            return res.status(400).json({ error: 'Ya existe un usuario con ese correo' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const resultado = await pool.query(
            `INSERT INTO usuarios (nombre, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, nombre, email, creado_en`,
            [nombre, email, hashedPassword]
        );

        const usuario = resultado.rows[0];

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario
        });
    } catch (error) {
        console.error('Error al registrar usuario: ', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { 
    register,
    login
}