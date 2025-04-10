const { pool } = require('../../db');

async function crearTablaDiasRutina() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS dias_rutina (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            rutina_id UUID REFERENCES rutinas(id) ON DELETE CASCADE,
            dia_semana VARCHAR(20) CHECK (dia_semana IN (
                'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
            )),
            hora TIME
        )
    `);
    console.log('Tabla "dias_rutina" creada');
}

module.exports = crearTablaDiasRutina;