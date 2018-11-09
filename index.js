const express = require ('express');
const mongoose = require ('mongoose');
const cookieSession = require('cookie-session');
const passport = require ('passport');
const bodyParser = require('body-parser');
const keys = require ('./config/keys.js');
require ('./models/User');
require ('./services/passport');


mongoose.connect (keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use (
    cookieSession({
       maxAge: 30 * 24 * 60 * 60 * 1000,
       keys: [keys.cookieKey] 
    })
);

// initialize Passport and tell it to use cookies.
app.use(passport.initialize());
app.use(passport.session());

// pass 'app' as an argument to the funstion that authRoutes exports
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT);
