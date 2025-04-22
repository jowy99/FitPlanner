const { pool } = require('../../db');

async function seedTiposEquipo() {
	try {
		const tipos = [
			'Sin equipo',
			'Máquina',
			'Mancuernas',
			'Barra',
			'Cables',
			'Peso corporal',
			'Bandas de resistencia',
			'Kettlebell',
		];

		for (const nombre of tipos) {
			await pool.query(
				`INSERT INTO tipos_equipo (nombre)
				 VALUES ($1)
				 ON CONFLICT (nombre) DO NOTHING`,
				[nombre]
			);
		}

		console.log('🌱 Tipos de equipo insertados correctamente');
	} catch (error) {
		console.error('❌ Error al insertar tipos de equipo:', error.message);
		throw error;
	}
}

module.exports = seedTiposEquipo;