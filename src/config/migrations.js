const { pool } = require('./db');

// Crea la extensión para poder usar gen_random_uuid()
async function crearExtensionPGCrypto() {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    console.log('✅ Extensión "pgcrypto" disponible');
  } catch (error) {
    console.error('❌ Error al crear la extensión pgcrypto:', error.message);
    throw error;
  }
}

// Crea la tabla de usuarios
async function crearTablaUsuarios() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          nombre VARCHAR(100) NOT NULL CHECK (char_length(nombre) >= 2),
          email VARCHAR(100) UNIQUE NOT NULL CHECK (position('@' in email) > 1),
          password VARCHAR(255) NOT NULL,
          rol VARCHAR(20) NOT NULL DEFAULT 'usuario' CHECK (rol IN ('usuario', 'admin')),
          creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✅ Tabla "usuarios" creada o ya existente');
    } catch (error) {
      console.error('❌ Error al crear la tabla usuarios:', error.message);
      throw error;
    }
  }

async function ejecutarMigraciones() {
  await crearExtensionPGCrypto();
  await crearTablaUsuarios();
}

module.exports = {
  ejecutarMigraciones
};