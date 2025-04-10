const { pool } = require('../../db');

async function crearTablaRutinaEjercicios() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS rutina_ejercicios(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            rutina_id UUID REFERENCES rutinas(id) ON DELETE CASCADE,
            ejercicio_id UUID REFERENCES ejercicios(id),
            orden INTEGER
        )
    `);
    console.log('Tabla "rutina_ejercicios" creada');   
}

module.exports = crearTablaRutinaEjercicios;