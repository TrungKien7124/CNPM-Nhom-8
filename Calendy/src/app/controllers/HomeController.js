const Event = require('../models/event.model');

class HomeController {

    index(req, res) {
        res.render('home')

        // Event.find({})
        //     .then(events => {
        //         events = events.map(event => event.toObject())
        //         res.render('home', { events })
        //     })
        //     .catch(err => {
        //         res.status(500).send({ error: 'hehehe'});
        //     })
    }
}

module.exports = new HomeController;