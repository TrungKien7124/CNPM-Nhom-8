var express = require('express');
var router = express.Router();

const homeController = require('../app/controllers/HomeController.js');

router.use('/', homeController.index);

module.exports = router;