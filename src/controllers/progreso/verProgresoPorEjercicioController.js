const { pool } = require('../../config/db');

const verProgresoPorEjercicio = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { rutina_ejercicio_id } = req.params;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      const resultado = await pool.query(`
        SELECT peso, serie, fecha
        FROM progreso
        WHERE usuario_id = $1 AND rutina_ejercicio_id = $2
        ORDER BY fecha ASC, serie ASC
      `, [usuario_id, rutina_ejercicio_id]);
  
      res.json({
        total: resultado.rowCount,
        registros: resultado.rows
      });
  
    } catch (error) {
      console.error('❌ Error al consultar el progreso:', error.message);
      res.status(500).json({ error: 'Error al consultar el progreso' });
    }
};

module.exports = verProgresoPorEjercicio;