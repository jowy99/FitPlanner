const { pool } = require('../../db');

async function crearTablaTiposEquipo() {
    await pool.query (`
        CREATE TABLE IF NOT EXISTS tipos_equipo (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) UNIQUE NOT NULL
        )
    `);
    console.log('Tabla "tipos_equipo" creada.');
}

module.exports = crearTablaTiposEquipo;