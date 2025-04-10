const { pool } = require('../../../config/db');

const crearRutina = async (req, res) => {
    const { nombre, descripcion, categoria, es_publica, dia_semana, hora_dia } = req.body;
    const usuario_id = req.usuario?.id;

    if(!usuario.id){
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if(!nombre){
        return res.status(400).json({ error: ' El nombre de la rutina es obligatorio' });
    }

    try {
        const resultado = await pool.query(`
            INSERT INTO rutinas (usuario_id, nombre, descripcion, categoria, es_publica)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `, [usuario_id, nombre, descripcion || null, categoria || null, es_publica || false]
        );

        const rutina = resultado.rows[0];

        if(dia_semana) {
            await pool.query(`
                INSERT INTO dias_rutina (rutina_id, dia_semana, hora)
                VALUES ($1, $2, $3)
                `, [rutina.id, dia_semana, hora_dia || null]
            );
        }

        res.status(201).json({
            mensaje: 'Rutina creada correctamente',
            rutina
        });
    } catch (error) {
        console.error('Error al crear la rutina: ', error.message);
        res.status(500).json({ error: 'Error al crear la rutina' });
    }
};

module.exports = crearRutina;