const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart/create
router.get('/create', cartController.createCart);

module.exports = router;