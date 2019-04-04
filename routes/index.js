const express = require("express");

const router = express.Router();
const indexController = require('../controller/indexController');
const {ensureAuthenticated} = require('../util/auth');



//init home page route
router.get('/', indexController.index)

router.get('/dashboard', ensureAuthenticated, indexController.getDashBoard);



module.exports = router;