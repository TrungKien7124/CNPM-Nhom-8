const express = require('express');
const router = express.Router();
const APIController = require('../app/controllers/APIController.js');

router.get('/get-events', APIController.getEvents);

router.post('/add-event', APIController.addEvent);

router.post('/update-event', APIController.updateEvent);

router.post('/delete-event', APIController.deleteEvent);

module.exports = router;