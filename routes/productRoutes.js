const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST /product/getProduct/:id
router.get('/getProduct/:id', productController.getProduct);

// GET /product/get/all
router.get('/get/all', productController.getAll);

// POST /product/add
router.post('/create', productController.createProduct);

module.exports = router;