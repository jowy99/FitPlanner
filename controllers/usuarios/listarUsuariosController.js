const { pool } = require('../../../config/db');

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

module.exports = listarUsuarios;