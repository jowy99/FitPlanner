const { pool } = require('../config/db');

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

const obtenerRutinas = async (req, res) => {
    const usuario_id = req.usuario?.id;
  
    if (!usuario_id) {
        return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
        const resultado = await pool.query(`
            SELECT r.*, 
                json_agg(json_build_object('dia_semana', d.dia_semana, 'hora', d.hora)) AS dias
            FROM rutinas r
            LEFT JOIN dias_rutina d ON r.id = d.rutina_id
            WHERE r.usuario_id = $1
            GROUP BY r.id
            ORDER BY r.creado_en DESC
            `, [usuario_id]
        );

        res.json({
            total: resultado.rowCount,
            rutinas: resultado.rows
        });
    } catch (error) {
        console.error('❌ Error al obtener las rutinas:', error.message);
        res.status(500).json({ error: 'Error al obtener rutinas' });
    }
};

const obtenerRutinaPorId = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      // 1. Obtener rutina
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas
        WHERE id = $1 AND usuario_id = $2
      `, [id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(404).json({ error: 'Rutina no encontrada' });
      }
  
      const rutina = rutinaRes.rows[0];
  
      // 2. Obtener días
      const diasRes = await pool.query(`
        SELECT dia_semana, hora
        FROM dias_rutina
        WHERE rutina_id = $1
      `, [id]);
  
      // 3. Obtener ejercicios y configuraciones
      const ejerciciosRes = await pool.query(`
        SELECT 
          e.id AS ejercicio_id,
          e.nombre,
          e.grupo_muscular,
          e.descripcion,
          te.nombre AS tipo_equipo,
          c.series,
          c.repeticiones,
          c.descans_segundos,
          c.notas
        FROM rutina_ejercicios re
        JOIN ejercicios e ON re.ejercicio_id = e.id
        LEFT JOIN tipos_equipo te ON e.tipo_equipo_id = te.id
        LEFT JOIN configuracion_ejercicio c ON c.rutina_ejercicio_id = re.id
        WHERE re.rutina_id = $1
        ORDER BY re.orden ASC
      `, [id]);
  
      res.json({
        rutina,
        dias: diasRes.rows,
        ejercicios: ejerciciosRes.rows
      });
  
    } catch (error) {
      console.error('❌ Error al obtener la rutina:', error.message);
      res.status(500).json({ error: 'Error al obtener la rutina' });
    }
};

const editarRutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params;
    const { nombre, descripcion, categoria, es_publica } = req.body;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      // Comprobar que la rutina existe y pertenece al usuario
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas
        WHERE id = $1 AND usuario_id = $2
      `, [id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(404).json({ error: 'Rutina no encontrada o no autorizada' });
      }
  
      // Actualizar los campos permitidos (solo si vienen definidos)
      await pool.query(`
        UPDATE rutinas
        SET
          nombre = COALESCE($1, nombre),
          descripcion = COALESCE($2, descripcion),
          categoria = COALESCE($3, categoria),
          es_publica = COALESCE($4, es_publica)
        WHERE id = $5
      `, [nombre, descripcion, categoria, es_publica, id]);
  
      res.json({ mensaje: 'Rutina actualizada correctamente' });
  
    } catch (error) {
      console.error('❌ Error al editar la rutina:', error.message);
      res.status(500).json({ error: 'Error al editar la rutina' });
    }
};

const eliminarRutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas
        WHERE id = $1 AND usuario_id = $2
      `, [id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(404).json({ error: 'Rutina no encontrada o no autorizada' });
      }
  
      await pool.query(`DELETE FROM rutinas WHERE id = $1`, [id]);
  
      res.json({ mensaje: 'Rutina eliminada correctamente' });
  
    } catch (error) {
      console.error('❌ Error al eliminar la rutina:', error.message);
      res.status(500).json({ error: 'Error al eliminar la rutina' });
    }
};

const añadirEjercicioARutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { rutina_id, ejercicio_id, orden } = req.body;
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    if (!rutina_id || !ejercicio_id) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
  
    try {
      // Verificar que la rutina pertenece al usuario
      const rutinaRes = await pool.query(`
        SELECT * FROM rutinas WHERE id = $1 AND usuario_id = $2
      `, [rutina_id, usuario_id]);
  
      if (rutinaRes.rowCount === 0) {
        return res.status(403).json({ error: 'No tienes permiso para modificar esta rutina' });
      }
  
      // Insertar ejercicio en la rutina
      const resultado = await pool.query(`
        INSERT INTO rutina_ejercicios (rutina_id, ejercicio_id, orden)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [rutina_id, ejercicio_id, orden || null]);
  
      res.status(201).json({
        mensaje: 'Ejercicio añadido a la rutina',
        datos: resultado.rows[0]
      });
  
    } catch (error) {
      console.error('❌ Error al añadir ejercicio a la rutina:', error.message);
      res.status(500).json({ error: 'Error al añadir ejercicio' });
    }
};

const eliminarEjercicioDeRutina = async (req, res) => {
    const usuario_id = req.usuario?.id;
    const { id } = req.params; // id del registro en rutina_ejercicios
  
    if (!usuario_id) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    try {
      // Verificar si el ejercicio está en una rutina del usuario
      const validacion = await pool.query(`
        SELECT re.*
        FROM rutina_ejercicios re
        JOIN rutinas r ON re.rutina_id = r.id
        WHERE re.id = $1 AND r.usuario_id = $2
      `, [id, usuario_id]);
  
      if (validacion.rowCount === 0) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar este ejercicio' });
      }
  
      // Eliminar
      await pool.query(`DELETE FROM rutina_ejercicios WHERE id = $1`, [id]);
  
      res.json({ mensaje: 'Ejercicio eliminado de la rutina correctamente' });
  
    } catch (error) {
      console.error('❌ Error al eliminar el ejercicio de la rutina:', error.message);
      res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = {
    crearRutina,
    obtenerRutinas,
    obtenerRutinaPorId,
    editarRutina,
    eliminarRutina,
    añadirEjercicioARutina,
    eliminarEjercicioDeRutina
};