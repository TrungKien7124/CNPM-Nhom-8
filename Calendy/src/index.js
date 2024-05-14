const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine.js');
const webRoute = require('./routes/web.js');
const APIRoute = require('./routes/api.js');
const {db, databaseQuery} = require('./config/database.js');
const configReqBody = require('./config/reqBody.js');
const port = 3000;
const session = require('express-session');

// Cau hinh req.body de lay du lieu tu api
configReqBody(app);

// Cau hinh handlebars va static files
configViewEngine(app);

// Cau hinh session
app.use(session({
    secret: 'public',
    resave: false,
    saveUninitialized: false
}));

// Khoi tao routes
app.use('/', webRoute);
app.use('/api', APIRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})