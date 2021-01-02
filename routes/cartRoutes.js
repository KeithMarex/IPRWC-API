const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart/create
router.get('/create', cartController.createCart);

// POST /cart/getProducts
router.post('/getProducts', cartController.getProducts);

// POST /cart/addProduct
router.post('/addProduct', cartController.addProductToCart);

// POST /cart/changeValue
router.post('/changeValue', cartController.changeValue);

// POST /cart/deleteProduct
router.post('/deleteProduct', cartController.deleteProduct);

// POST /cart/increaseAmountByOne
router.post('/increaseAmountByOne', cartController.iABO);

module.exports = router;