const { pool } = require('../../db');

async function crearTablaProgreso() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS progreso (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
      rutina_id UUID REFERENCES rutinas(id) ON DELETE CASCADE,
      rutina_ejercicio_id UUID REFERENCES rutina_ejercicios(id) ON DELETE CASCADE,
      peso NUMERIC,
      serie INTEGER,
      fecha DATE DEFAULT CURRENT_DATE
    )
  `);
  console.log('✅ Tabla "progreso" creada');
}

module.exports = crearTablaProgreso;