const { pool } = require('../../config/db');

const eliminarEjercicioDeRutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params; // id del registro en rutina_ejercicios
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      // Verificar si el ejercicio está en una rutina del usuario
      const validacion = await pool.query(`
        SELECT re.*
        FROM rutina_ejercicios re
        JOIN rutinas r ON re.rutina_id = r.id
        WHERE re.id = $1 AND r.usuario_id = $2
      `, [id, usuario_id]);
  
      if (validacion.rowCount === 0) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar este ejercicio' });
      }
  
      // Eliminar
      await pool.query(`DELETE FROM rutina_ejercicios WHERE id = $1`, [id]);
  
      res.json({ mensaje: 'Ejercicio eliminado de la rutina correctamente' });
  
    } catch (error) {
      console.error('❌ Error al eliminar el ejercicio de la rutina:', error.message);
      res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = eliminarEjercicioDeRutina;