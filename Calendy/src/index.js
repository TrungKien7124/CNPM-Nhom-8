const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine.js');
const webRoute = require('./routes/web.js');
const APIRoute = require('./routes/api.js');
const {db, databaseQuery} = require('./config/database.js');
const port = 3000;

// Cau hinh handlebars va static files
configViewEngine(app);

// Khoi tao routes
app.use('/', webRoute);
app.use('/api', APIRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})