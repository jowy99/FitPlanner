const { crearExtensionPGCrypto, crearTablaUsuarios } = require('./migrations/usuarios');
const crearTablaEjercicios = require('./migrations/ejercicios/ejercicios');
const crearTablaRutinas = require('./migrations/ejercicios/rutinas');
const crearTablaDiasRutina = require('./migrations/ejercicios/dias_rutina');
const crearTablaRutinaEjercicios = require('./migrations/ejercicios/rutina_ejercicios');
const crearTablaConfiguracionEjercicio = require('./migrations/ejercicios/configuracion_ejercicios');
const crearTablaTiposEquipo = require('./migrations/ejercicios/tipos_equipo');
const crearTablaProgreso = require('./migrations/progreso/registroProgreso');

const seedTiposEquipo = require('./seeds/ejercicios/tiposEquipoSeed');

async function ejecutarMigraciones() {
    await crearExtensionPGCrypto();
    await crearTablaUsuarios();
    await crearTablaTiposEquipo();
    await crearTablaEjercicios();
    await crearTablaRutinas();
    await crearTablaDiasRutina();
    await crearTablaRutinaEjercicios();
    await crearTablaConfiguracionEjercicio();
    await crearTablaProgreso();
};

async function ejecutarSeeds() {
    await seedTiposEquipo();
}

module.exports = {
    ejecutarMigraciones,
    ejecutarSeeds
};