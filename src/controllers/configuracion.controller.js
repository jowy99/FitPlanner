const { pool } = require('../config/db');

const configurarEjercicio = async (req, res) => {
  const usuario_id = req.usuario?.id;
  const {
    rutina_ejercicio_id,
    series,
    repeticiones,
    descanso,
    descansoUnidad,
    notas
  } = req.body;

  if (!usuario_id) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (!rutina_ejercicio_id || !series || !repeticiones || !descanso) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // Convertir descanso a segundos si viene en minutos
  let descanso_segundos = Number(descanso);
  if (descansoUnidad === 'm') descanso_segundos *= 60;

  try {
    // Validar que el ejercicio pertenece a una rutina del usuario
    const validacion = await pool.query(`
      SELECT re.*
      FROM rutina_ejercicios re
      JOIN rutinas r ON re.rutina_id = r.id
      WHERE re.id = $1 AND r.usuario_id = $2
    `, [rutina_ejercicio_id, usuario_id]);

    if (validacion.rowCount === 0) {
      return res.status(403).json({ error: 'No tienes permiso para configurar este ejercicio' });
    }

    // Insertar configuración
    const resultado = await pool.query(`
      INSERT INTO configuracion_ejercicio (
        rutina_ejercicio_id, series, repeticiones, descans_segundos, notas
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [rutina_ejercicio_id, series, repeticiones, descanso_segundos, notas || null]);

    res.status(201).json({
      mensaje: 'Configuración guardada correctamente',
      configuracion: resultado.rows[0]
    });

  } catch (error) {
    console.error('❌ Error al guardar configuración:', error.message);
    res.status(500).json({ error: 'Error al guardar configuración' });
  }
};

module.exports = { configurarEjercicio };