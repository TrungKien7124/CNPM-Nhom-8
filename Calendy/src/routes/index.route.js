const homeRouter = require('./home.route');

function route(app) {
    
    app.use('/', homeRouter);
}

module.exports = route;