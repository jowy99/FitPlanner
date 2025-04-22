const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../config/db').pool;

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

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '3h' }
        );

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario,
            token
        });
    } catch (error) {
        console.error('Error al registrar usuario: ', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = register;