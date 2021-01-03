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

var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// Include all Path/ Route names
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

/**
 * Use body parser for all handlers
 */
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.use("/.well-known/acme-challenge", express.static("letsencrypt/.well-known/acme-challenge"));

app.get('*', function(req, res) {  
	res.redirect('https://' + req.headers.host + req.url);
})

/**
 * Create all base paths for the api
 */
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

/**
 * Log all base information for the api
 */
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Write the port number in the console window
 */
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(HTTPport, () => {
    console.log(`[API Controller] App running on HTTP port ${HTTPport}.`)});

httpsServer.listen(HTTPSport, () => {
    console.log(`[API Controller] App running on HTTPS port ${HTTPSport}.`)});
