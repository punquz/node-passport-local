const express = require("express");

const router = express.Router();
const userController = require('../controller/userController');
const {ensureAuthenticated} = require('../util/auth');

router.get('/login', userController.userLogin)

router.get('/register', userController.userRegister)

router.post('/register', userController.postUserRegister)

router.post('/login', userController.postLogin)

router.get('/logout', userController.logout)


module.exports = router;