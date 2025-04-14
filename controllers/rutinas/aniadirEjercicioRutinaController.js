const { pool } = require('../../config/db');

const aniadirEjercicioRutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { rutina_id, ejercicio_id, orden } = req.body;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    if (!rutina_id || !ejercicio_id) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
  
    try {
      // Verificar que la rutina pertenece al usuario
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas WHERE id = $1 AND usuario_id = $2
      `, [rutina_id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(403).json({ error: 'No tienes permiso para modificar esta rutina' });
      }
  
      // Insertar ejercicio en la rutina
      const resultado = await pool.query(`
        INSERT INTO rutina_ejercicios (rutina_id, ejercicio_id, orden)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [rutina_id, ejercicio_id, orden || null]);
  
      res.status(201).json({
        mensaje: 'Ejercicio añadido a la rutina',
        datos: resultado.rows[0]
      });
  
    } catch (error) {
      console.error('❌ Error al añadir ejercicio a la rutina:', error.message);
      res.status(500).json({ error: 'Error al añadir ejercicio' });
    }
};

module.exports = aniadirEjercicioRutina;