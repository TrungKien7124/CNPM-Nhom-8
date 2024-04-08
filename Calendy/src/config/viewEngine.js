const express = require('express');
const exphbs = require('express-handlebars');

function configViewEngine(app) {
    app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', './src/resources/views');

    //static file
    app.use(express.static('./src/public'));
}

module.exports = configViewEngine;