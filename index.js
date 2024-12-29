const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require ("body-parser");
const flash = require('express-flash');
var cookieParser = require('cookie-parser');
const session = require('express-session');

require("dotenv").config();

const database = require("./config/database");
const systemconfig = require("./config/system")

const route = require("./routers/clients/index.route");
const routeAdmin = require("./routers/admin/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
//Flash
app.use(cookieParser("JHGJKLKLGFLK"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash
//App locals variables
app.locals.prefixAdmin = systemconfig.prefixAdmin;


app.use(express.static(`${__dirname}/public`));
//Routes
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })