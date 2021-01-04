const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /user/all
router.get('/all', userController.getAllUsers);

// POST /user/create/
router.post('/create', userController.createUser);

// POST /user/checkUserLogin
router.post('/checkUserLogin', userController.checkUserLogin);

// POST /user/passwordChange
router.post('/passChange', userController.changePassword);

// POST /user/password/reset
router.post('/passReset', userController.resetPassword);

// POST /user/password/reset
router.post('/passReset', userController.resetPassword);

// POST /user/update
router.post('/update', userController.updateUser);

module.exports = router;