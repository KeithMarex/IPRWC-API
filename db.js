const pgp = require('pg-promise')(/* initialization options */)

// Onderstaande data later ergens opslaan -> Veiligheid
const cn = {
    host: '81.207.59.245',
    port: 5432,
    database: 'hsleidendb',
    user: 'hsleiden',
    password: 'hsleiden'
};

const db = pgp(cn); // database instance;

db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;
        console.log('Database verbinding opgesteld!');
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

module.exports = db;