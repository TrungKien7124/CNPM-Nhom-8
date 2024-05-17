const { db, databaseQuery } = require('../../config/database.js');

class Event {
    constructor() {
    }

    getUserValue({title, date, description}) {
        this.title = title;
        this.date = date;
        this.description = description;
    }

    async addEvent(user_id, {title, time, date, description, type}) {
        const query = `INSERT INTO events (user_id, title, date, description, time, type) VALUES ('${user_id}', '${title}', '${date}', '${description}', '${time}', '${type}')`;
        return await databaseQuery(query);
    }

    async getEvents(user_id) {
        const query = `SELECT * FROM events WHERE user_id = ${user_id}`;
        return await databaseQuery(query);
    }

    async deleteEvent(id) {
        const query = `DELETE FROM events WHERE id = ${id}`;
        return await databaseQuery(query);
    }

    async updateEvent({id, title, time, date, description, type}) {
        const query = `UPDATE events SET title = '${title}', date = '${date}', description = '${description}', time = '${time}', type = '${type}' WHERE id = '${id}'`;
        return await databaseQuery(query);
    }
}

module.exports = Event;