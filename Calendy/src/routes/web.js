const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController.js');

router.get ('/', homeController.getHomePage);

module.exports = router;