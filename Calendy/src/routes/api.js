const express = require('express');
const router = express.Router();
const APIController = require('../app/controllers/APIController.js');

router.get('/get-events', APIController.getEvents);

router.post('/add-event', APIController.addEvent);

module.exports = router;