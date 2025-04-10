const { Client, Pool } = require('pg');

async function crearBaseDeDatosSiNoExiste() {
    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try{
        await client.connect();

        // Verificamos si existe la base de datos
        const res = await client.query(`
            SELECT 1 FROM pg_database WHERE datname = $1
            `, [process.env.DB_NAME]);

            if(res.rowCount === 0) {
                // Si no existe, la creamos
                await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
                console.log(`Base de datos ${process.env.DB_NAME} creada`);
            } else {
                console.log(`La base de datos ${process.env.DB_NAME} ya existe`);
            }
    } catch (error) {
        console.error(`Error verificando/creando la base de datos: `, error);
        throw error;
    } finally {
        await client.end();
    }
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = {
    crearBaseDeDatosSiNoExiste,
    pool
};

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// pool.connect()
//     .then(() => console.log('Conexión a PostgreSQL establecida'))
//     .catch(err => console.error('Error al conectar a PostgreSQL: ', err));

// module.exports = pool;