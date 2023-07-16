require('dotenv').config();
require('./initDockerSecrets')();

const path = require('path');
const express = require('express');
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const passport = require('passport');

// configuration ===============================================================
// connect to our database

require('./server/config/passport')(passport); // pass passport for configuration

app.use(require('helmet')());

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// required for passport
app.use(session({
	secret: 'camelslikehorseshavefourlegs',
	resave: true,
	saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(passport.authenticate('remember-me'));

app.use(express.static('client/build'));

// routes =====================================================================

require('./server/app/routes/index')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.set('port', (process.env.API_PORT || 3002));

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});





