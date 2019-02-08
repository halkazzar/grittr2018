const express = require ('express');
const mongoose = require ('mongoose');
const cookieSession = require('cookie-session');
const passport = require ('passport');
const bodyParser = require('body-parser');
const keys = require ('./config/keys.js');

//const amazonES = require('./services/amazones');
    
require ('./models/User');
require ('./services/passport');

//connect to Mongo
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
require('./routes/gritsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assests
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    // if it doesn't recongnize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));    
    });
        
}


const PORT = process.env.PORT || 8080;

app.listen(PORT);
