const { pool } = require('../../db');

async function crearTablaRutinas() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS rutinas (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                categoria VARCHAR(50),
                es_publica BOOLEAN DEFAULT false,
                creado_en TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log('✅ Tabla "rutinas" creada');
    } catch (error) {
        console.error('❌ Error al crear la tabla rutinas:', error.message);
        throw error;
    }
}

module.exports = crearTablaRutinas;