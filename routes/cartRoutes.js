const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart/create
router.get('/create', cartController.createCart);

// POST /cart/getProducts
router.post('/getProducts', cartController.getProducts);

// POST /cart/addProduct
router.post('/addProduct', cartController.addProductToCart);

// POST /cart/increaseAmount
router.post('/increaseAmount', cartController.increaseAmount);

module.exports = router;