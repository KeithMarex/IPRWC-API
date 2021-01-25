const pgp = require('pg-promise')(/* initialization options */)
require('dotenv').config();


// Onderstaande data later ergens opslaan -> Veiligheid
const cn = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
};

const db = pgp(cn); // database instance;

db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;
        console.log('[Database Controller] Connection has been succesfully set up.');
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

module.exports = db;