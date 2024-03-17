const express = require('express')
const exphbs = require('express-handlebars');
const app = express()
const port = 3000

const route = require('./routes/index.route.js')

const db = require('./config/database/index.js');

db.connect();

app.use(express.static('./src/public'));

// View Engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})