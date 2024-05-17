const express = require('express');
const router = express.Router();
const APIController = require('../app/controllers/evenController.js');
const loginController = require('../app/controllers/loginController.js');
const loginRequest = require('../middleware/loginRequest.js');

router.get('/get-events', loginRequest, APIController.getEvents);

router.post('/add-event', loginRequest, APIController.addEvent);

router.post('/update-event', loginRequest, APIController.updateEvent);

router.post('/delete-event', loginRequest, APIController.deleteEvent);

router.post('/login', loginController.login);

router.post('/logout', loginController.logout);

const registerController = require('../app/controllers/registerController.js');
router.post('/register', registerController.registerUser);
router.post('/reset-password', registerController.resetPassword);
module.exports = router;