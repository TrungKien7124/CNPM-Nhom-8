const { db, databaseQuery } = require('../../config/database.js');

class Event {
    constructor() {
    }

    getUserValue({title, date, description}) {
        this.title = title;
        this.date = date;
        this.description = description;
    }

    async addEvent({title, time, date, description}) {
        const query = `INSERT INTO events (title, date, description, time) VALUES ('${title}', '${date}', '${description}', '${time}')`;
        return await databaseQuery(query);
    }

    async getEvents() {
        const query = `SELECT * FROM events`;
        return await databaseQuery(query);
    }

    async deleteEvent(id) {
        const query = `DELETE FROM events WHERE id = ${id}`;
        return await databaseQuery(query);
    }

    async updateEvent({id, title, time, date, description}) {
        const query = `UPDATE events SET title = '${title}', date = '${date}', description = '${description}', time = '${time}' WHERE id = '${id}'`;
        return await databaseQuery(query);
    }
}

module.exports = Event;