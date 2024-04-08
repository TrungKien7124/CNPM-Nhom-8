const { db, databaseQuery } = require('../../config/database.js');

let APIController = {
    getEvents(req, res) {
        databaseQuery('SELECT * FROM events')
            .then((events) => {
                return res.status(200).json(events);
            })
            .catch((err) => {
                return res.status(500).json({error: err.message});
            });
    },

    addEvent(req, res) {
        let {title, start_date, end_date} = req.body;
        let sql = `INSERT INTO events (title, start_date, end_date) VALUES ('${title}', '${start_date}', '${end_date}')`;
        databaseQuery(sql)
            .then(() => {
                return res.status(200).json({message: 'Add event successfully!'});
            })
            .catch((err) => {
                return res.status(500).json({error: err.message});
            });
    }
}

module.exports = APIController;