const seedTiposEquipo = require('./seeds/ejercicios/tiposEquipoSeed');

async function ejecutarSeeds() {
    await seedTiposEquipo();
}

module.exports = {
    ejecutarSeeds
};