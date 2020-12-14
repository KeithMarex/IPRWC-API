const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart/getAll/:userId
router.get('/getAll/:userId', cartController.getAllProducts);

// POST /cart/create/:id
router.get('/create/:id', cartController.createCart)

// POST /cart/add/:userId/:productId
router.post('/add/:userId/:productId', cartController.addProduct);

// POST /cart/delete/:userId/:productId
router.post('/delete/:userId/:productId', cartController.deleteProduct)

// POST /cart/clear/:userId
router.post('/clear/:userId', cartController.clearCart);

// POST /cart/modify/:userId/:productId/:amount
router.post('/modify/:userId/:productId/:amount', cartController.modifyCart);

module.exports = router;