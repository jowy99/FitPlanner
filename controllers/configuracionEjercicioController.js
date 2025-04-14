const { pool } = require('../config/db');

const guardarConfiguracionEjercicio = async (req, res) => {
  const {
    rutina_ejercicio_id,
    series,
    repeticiones,
    descanso,
    descansoUnidad,
    notas
  } = req.body;

  let descans_segundos = Number(descanso);
  if (descansoUnidad === 'm') descans_segundos *= 60;

  try {
    await pool.query(`
      INSERT INTO configuracion_ejercicio (
        rutina_ejercicio_id,
        series,
        repeticiones,
        descans_segundos,
        notas
      ) VALUES ($1, $2, $3, $4, $5)
    `, [rutina_ejercicio_id, series, repeticiones, descans_segundos, notas]);

    res.status(201).json({ mensaje: 'Configuración guardada correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar la configuración del ejercicio:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = guardarConfiguracionEjercicio;