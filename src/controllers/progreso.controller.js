const { pool } = require('../../config/db');

const registrarProgreso = async (req, res) => {
  const usuario_id = req.usuario?.id;
  const { rutina_id, rutina_ejercicio_id, peso, serie, fecha } = req.body;

  if (!usuario_id) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (!rutina_id || !rutina_ejercicio_id || !peso || !serie) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Verificar que la rutina pertenece al usuario
    const verificacion = await pool.query(`
      SELECT * FROM rutinas WHERE id = $1 AND usuario_id = $2
    `, [rutina_id, usuario_id]);

    if (verificacion.rowCount === 0) {
      return res.status(403).json({ error: 'No tienes acceso a esta rutina' });
    }

    const resultado = await pool.query(`
      INSERT INTO progreso (
        usuario_id, rutina_id, rutina_ejercicio_id, peso, serie, fecha
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [
      usuario_id,
      rutina_id,
      rutina_ejercicio_id,
      peso,
      serie,
      fecha || null
    ]);

    res.status(201).json({
      mensaje: 'Progreso registrado correctamente',
      progreso: resultado.rows[0]
    });

  } catch (error) {
    console.error('❌ Error al registrar el progreso:', error.message);
    res.status(500).json({ error: 'Error al guardar el progreso' });
  }
};

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

module.exports = {
    registrarProgreso,
    verProgresoPorEjercicio
};