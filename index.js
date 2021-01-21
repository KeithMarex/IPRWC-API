// Make use of libraries
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require("nodemailer");
const HTTPport = 80;
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
 * Use body parser for all handlers
 */
app.use(cors({
    origin: 'https://iprwcshop.kvdmr.nl'
  }));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

/**
 * Create all base paths for the api
 */
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

/**
 * Log all base information for the api
 */
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
    next();
});

/**
 * Write the port number in the console window
 */
// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(HTTPport, () => {
//     console.log(`[API Controller] App running on HTTP port ${HTTPport}.`)});

httpsServer.listen(HTTPSport, () => {
    console.log(`[API Controller] App running on HTTPS port ${HTTPSport}.`)});
