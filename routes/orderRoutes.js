const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

// POST /order/create
router.post('/create', orderController.create);

// GET /order/get/:orderId
router.get('/get/:userId', orderController.get);

module.exports = router;