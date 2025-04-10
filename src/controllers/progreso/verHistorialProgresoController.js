const { pool } = require('../../config/db');

const verHistorialProgreso = async (req, res) => {
    const usuario_id = req.usuario?.id;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      const resultado = await pool.query(`
        SELECT 
          p.fecha,
          r.nombre AS rutina_nombre,
          e.nombre AS ejercicio,
          p.serie,
          p.peso
        FROM progreso p
        JOIN rutinas r ON p.rutina_id = r.id
        JOIN rutina_ejercicios re ON p.rutina_ejercicio_id = re.id
        JOIN ejercicios e ON re.ejercicio_id = e.id
        WHERE p.usuario_id = $1
        ORDER BY p.fecha DESC, r.nombre ASC, e.nombre ASC, p.serie ASC
      `, [usuario_id]);
  
      res.json({
        total: resultado.rowCount,
        historial: resultado.rows
      });
  
    } catch (error) {
      console.error('❌ Error al obtener el historial:', error.message);
      res.status(500).json({ error: 'Error al obtener el historial' });
    }
};

module.exports = verHistorialProgreso;