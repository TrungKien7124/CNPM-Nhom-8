const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./src/database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connect successfully!');
});
