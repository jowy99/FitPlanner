const { pool } = require('../../db');

async function crearTablaConfiguracionEjercicio() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS configuracion_ejercicio (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      rutina_ejercicio_id UUID REFERENCES rutina_ejercicios(id) ON DELETE CASCADE,
      series INTEGER,
      repeticiones INTEGER,
      descans_segundos INTEGER,
      notas TEXT
    )
  `);
  console.log('✅ Tabla "configuracion_ejercicio" creada');
}

module.exports = crearTablaConfiguracionEjercicio;