const express = require('express');
const path = require('path');
const logger = require('morgan');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const session = require("express-session");
const flash = require('express-flash');
const favicon = require('serve-favicon');

const passport = require('./src/config/passport.config');
const configureI18N = require('./src/config/i18n.config');

const i18n = configureI18N(__dirname);
const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(i18n.init);
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        i18n: (s, req) => new Handlebars.SafeString(req.data.root.__(s))
    }
}));
app.set('view engine', 'hbs');

app.use(favicon(__dirname + '/public/assets/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./src/routes'));

module.exports = app;