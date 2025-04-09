const { pool } = require('../config/db');

const listarUsuarios = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT * FROM usuarios ORDER BY creado_en DESC
        `);
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows
        });
    } catch (error){
        console.error('Error al listar usuarios: ', error.message);
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
};

const obtenerPerfil = async (req, res) => {
    const { id } = req.usuario;

    try {
        const resultado = await pool.query(
            `SELECT id, nombre, email, rol, creado_en FROM usuarios Where id = $1`,
            [id]
        );

        if(resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ usuario: resultado.rows[0] });
    } catch (error) {
        console.error('Error al obtener el perfil: ', error.message);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};

module.exports = {
    listarUsuarios,
    obtenerPerfil
};