const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /product/get/:id
router.get('/get/:id', productController.getProduct);

// GET /product/get/all
router.get('/get/all', productController.getAll);

// POST /product/add
router.post('/create', productController.create);

module.exports = router;