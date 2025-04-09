const { pool } = require('../config/db');

const esAdminMiddleware = async (req, res, next) => {
    try {
        const { id } = req.usuario;

        const resultado = await pool.query(
            `SELECT rol FROM usuarios WHERE id = $1`,
            [id]
        );

        if(resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const rolActual = resultado.rows[0].rol;

        if(rolActual !== 'admin'){
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores' });
        }

        next();
    } catch (error) {
        console.error('Error verificando rol: ', error.message);
        res.status(500).json({ error: 'Error interno verificacion permisos '});
    }
};

module.exports = esAdminMiddleware;