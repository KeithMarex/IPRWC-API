const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /user/all
router.get('/all', userController.getAllUsers);

// POST /user/create/
router.post('/create', userController.createUser);

// POST /user/checkUserLogin
router.post('/checkUserLogin', userController.checkUserLogin);

// POST /user/password/change
// router.post('/password/change', userController.changePassword);

module.exports = router;