const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /user/all
router.get('/all', userController.getAllUsers);

// GET /user/get/:email
router.get('/get/:email', userController.getUser);

// POST /user/create/
router.post('/create', userController.createUser);

// DELETE /user/delete
router.post('/delete', userController.deleteUser);

// DELETE /user/checkUserLogin
router.get('/checkUserLogin/:useremail/:userpassword', userController.checkUserLogin);

// POST /user/password/change
router.post('/password/change', userController.changePassword);

module.exports = router;