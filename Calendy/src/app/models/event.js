const { db, databaseQuery } = require('../../config/database.js');

class Event {
    constructor() {
    }

    getUserValue({title, start_date, end_date}) {
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    async addEvent() {
        const query = `INSERT INTO events (title, start_date, end_date) VALUES ('${this.title}', '${this.start_date}', '${this.end_date}')`;
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

    async updateEvent(id) {
        const query = `UPDATE events SET title = '${this.title}', start_date = '${this.start_date}', end_date = '${this.end_date}' WHERE id = ${id}`;
        return await databaseQuery(query);
    }
}

module.exports = Event;