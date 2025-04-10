const { pool } = require('../db');

async function crearExtensionPGCrypto() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
  console.log('✅ Extensión "pgcrypto" disponible');
}

async function crearTablaUsuarios() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      rol VARCHAR(20) DEFAULT 'usuario',
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Tabla "usuarios" creada');
}

module.exports = {
  crearExtensionPGCrypto,
  crearTablaUsuarios
};