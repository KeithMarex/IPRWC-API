const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

// POST /order/create
router.post('/create', orderController.create);

// POST /order/add
router.post('/add', orderController.add);

// GET /order/get/:orderId
router.get('/get/:userId', orderController.get);

// GET /order/getById/:id
router.get('/getById/:id', orderController.getById);

module.exports = router;