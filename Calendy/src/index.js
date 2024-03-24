const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine.js');
const webRoute = require('./routes/web.js');
const db = require('./config/database.js');
const port = 3000;

// Ket noi voi mongodb
// db.connect();

// Cau hinh handlebars va static files
configViewEngine(app);

// Khoi tao routes
app.use('/', webRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})