const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/homeController.js');
const loginController = require('../app/controllers/loginController.js');

router.get ('/', homeController.getHomePage);

router.get ('/login', loginController.renderLoginPage);

module.exports = router;