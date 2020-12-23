const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart/create
router.get('/create', cartController.createCart);

// POST /cart/getProducts
router.post('/getProducts', cartController.getProducts);

module.exports = router;