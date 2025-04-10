const { pool } = require('../../db');

async function crearTablaEjercicios() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS ejercicios (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            nombre VARCHAR(100) NOT NULL,
            grupo_muscular VARCHAR(50),
            descripcion TEXT,
            tipo_equipo INTEGER REFERENCES tipos_equipo(id),
            es_activo BOOLEAN DEFAULT true,
            creado_en TIMESTAMP DEFAULT NOW()
        )
    `);
    console.log('Tabla "ejercicios" creada');
}

module.exports = crearTablaEjercicios;