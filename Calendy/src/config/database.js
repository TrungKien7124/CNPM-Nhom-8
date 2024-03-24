const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connect successfully!');
});

function databaseQuery(sql) {
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {db, databaseQuery};
