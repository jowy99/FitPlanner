const { pool } = require('../../config/db');

const obtenerRutinaPorId = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      // 1. Obtener rutina
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas
        WHERE id = $1 AND usuario_id = $2
      `, [id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(404).json({ error: 'Rutina no encontrada' });
      }
  
      const rutina = rutinaRes.rows[0];
  
      // 2. Obtener días
      const diasRes = await pool.query(`
        SELECT dia_semana, hora
        FROM dias_rutina
        WHERE rutina_id = $1
      `, [id]);
  
      // 3. Obtener ejercicios y configuraciones
      const ejerciciosRes = await pool.query(`
        SELECT 
          e.id AS ejercicio_id,
          e.nombre,
          e.grupo_muscular,
          e.descripcion,
          te.nombre AS tipo_equipo,
          c.series,
          c.repeticiones,
          c.descans_segundos,
          c.notas
        FROM rutina_ejercicios re
        JOIN ejercicios e ON re.ejercicio_id = e.id
        LEFT JOIN tipos_equipo te ON e.tipo_equipo_id = te.id
        LEFT JOIN configuracion_ejercicio c ON c.rutina_ejercicio_id = re.id
        WHERE re.rutina_id = $1
        ORDER BY re.orden ASC
      `, [id]);
  
      res.json({
        rutina,
        dias: diasRes.rows,
        ejercicios: ejerciciosRes.rows
      });
  
    } catch (error) {
      console.error('❌ Error al obtener la rutina:', error.message);
      res.status(500).json({ error: 'Error al obtener la rutina' });
    }
};

module.exports = obtenerRutinaPorId;