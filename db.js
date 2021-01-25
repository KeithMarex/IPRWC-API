const pgp = require('pg-promise')(/* initialization options */)
require('dotenv').config();

let host = process.env.HOST;
let port = process.env.PORT;
let database = process.env.DATABASE;
let user = process.env.USER;
let pass = process.env.PASSWORD;


// Onderstaande data later ergens opslaan -> Veiligheid
const cn = {
    host: host,
    port: port,
    database: database,
    user: user,
    password: pass
};

const db = pgp(cn); // database instance;

db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;
        console.log('[Database Controller] Connection has been succesfully set up.');
        console.log(host + port + database + user + pass);
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

module.exports = db;