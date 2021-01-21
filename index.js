// Make use of libraries
const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const HTTPSport = 443;

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/iprwc.kvdmr.nl/privkey.pem');
var certificate = fs.readFileSync('/etc/letsencrypt/live/iprwc.kvdmr.nl/fullchain.pem');
var credentials = {key: privateKey, cert: certificate};

// Include all Path/ Route names
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');


/**
 * Create all base paths for the api
 */
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

/**
 * Use body parser for all handlers
 */
var corsOptions = {
    origin: 'https://iprwcshop.kvdmr.nl',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

/**
 * Write the port number in the console window
 */
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(HTTPSport, () => {
    console.log(`[API Controller] App running on HTTPS port ${HTTPSport}.`)});
