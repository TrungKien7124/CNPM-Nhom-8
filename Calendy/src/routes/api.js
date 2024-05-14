const express = require('express');
const router = express.Router();
const APIController = require('../app/controllers/evenController.js');
const loginController = require('../app/controllers/loginController.js');

router.get('/get-events', APIController.getEvents);

router.post('/add-event', APIController.addEvent);

router.post('/update-event', APIController.updateEvent);

router.post('/delete-event', APIController.deleteEvent);

router.post('/login', loginController.login);

router.post('/logout', loginController.logout);

module.exports = router;