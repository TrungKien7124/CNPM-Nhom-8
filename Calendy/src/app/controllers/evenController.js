const { db, databaseQuery } = require('../../config/database.js');
const Event = require('../models/event.js');

let eventManagement = new Event();

let APIController = {
    getEvents(req, res) {
        eventManagement.getEvents(req.session.user_id)
            .then((events) => {
                return res.status(200).json(events);
            })
            .catch((err) => {
                return res.status(500).json({error: err.message});
            });
    },

    addEvent(req, res) {
        eventManagement.addEvent(req.session.user_id, req.body)
            .then(() => {
                return res.status(200).json({message: 'Add event successfully!'});
            })
            .catch((err) => {
                return res.status(500).json({error: err.message});
            });
    },

    updateEvent(req, res) {
        eventManagement.updateEvent(req.body)
            .then(() => {
                return res.status(200).json({message: 'Update event successfully!'});
            })
            .catch((err) => {
                return res.status(500).json({error: err.message});
            });
    },

    deleteEvent(req, res) {
        eventManagement.deleteEvent(req.body.id)
            .then(() => {
                return res.status(200).json({message: 'Delete event successfully!'});
            })
            .catch((err) => {
                return res.status(500).json({error: err.message});
            });
    },
}

module.exports = APIController;