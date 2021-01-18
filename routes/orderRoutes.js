const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

// POST /order/create
router.post('/create', orderController.create);

// GET /order/getAllOrders/:orderId
router.get('/getProducts/:orderId', orderController.getProductsByOrderID);

// GET /order/getAllOrders/:orderId
router.get('/getOrderIds/:userId', orderController.getOrderIds);


module.exports = router;