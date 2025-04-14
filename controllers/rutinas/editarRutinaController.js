const { pool } = require('../../config/db');

const editarRutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params;
    const { nombre, descripcion, categoria, es_publica } = req.body;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      // Comprobar que la rutina existe y pertenece al usuario
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas
        WHERE id = $1 AND usuario_id = $2
      `, [id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(404).json({ error: 'Rutina no encontrada o no autorizada' });
      }
  
      // Actualizar los campos permitidos (solo si vienen definidos)
      await pool.query(`
        UPDATE rutinas
        SET
          nombre = COALESCE($1, nombre),
          descripcion = COALESCE($2, descripcion),
          categoria = COALESCE($3, categoria),
          es_publica = COALESCE($4, es_publica)
        WHERE id = $5
      `, [nombre, descripcion, categoria, es_publica, id]);
  
      res.json({ mensaje: 'Rutina actualizada correctamente' });
  
    } catch (error) {
      console.error('❌ Error al editar la rutina:', error.message);
      res.status(500).json({ error: 'Error al editar la rutina' });
    }
};

module.exports = editarRutina;