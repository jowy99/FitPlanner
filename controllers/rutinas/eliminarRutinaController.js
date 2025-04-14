const { pool } = require('../../config/db');

const eliminarRutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas
        WHERE id = $1 AND usuario_id = $2
      `, [id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(404).json({ error: 'Rutina no encontrada o no autorizada' });
      }
  
      await pool.query(`DELETE FROM rutinas WHERE id = $1`, [id]);
  
      res.json({ mensaje: 'Rutina eliminada correctamente' });
  
    } catch (error) {
      console.error('❌ Error al eliminar la rutina:', error.message);
      res.status(500).json({ error: 'Error al eliminar la rutina' });
    }
};

module.exports = eliminarRutina;