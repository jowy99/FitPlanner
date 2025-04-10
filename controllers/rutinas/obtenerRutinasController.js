const { pool } = require('../../../config/db');

const obtenerRutinas = async (req, res) => {
    const usuario_id = req.usuario?.id;
  
    if (!usuario_id) {
        return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
        const resultado = await pool.query(`
            SELECT r.*, 
                json_agg(json_build_object('dia_semana', d.dia_semana, 'hora', d.hora)) AS dias
            FROM rutinas r
            LEFT JOIN dias_rutina d ON r.id = d.rutina_id
            WHERE r.usuario_id = $1
            GROUP BY r.id
            ORDER BY r.creado_en DESC
            `, [usuario_id]
        );

        res.json({
            total: resultado.rowCount,
            rutinas: resultado.rows
        });
    } catch (error) {
        console.error('❌ Error al obtener las rutinas:', error.message);
        res.status(500).json({ error: 'Error al obtener rutinas' });
    }
};

module.exports = obtenerRutinas;