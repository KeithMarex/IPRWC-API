// Make use of libraries
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Include all Path/ Route names
const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');

/**
 * Use body parser for all handlers
 */
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
// app.use('/product', productRoutes);
// app.use('/cart', cartRoutes);

/**
 * Log all base information for the api
 */
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

/**
 * Write the port number in the console window
 */
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

