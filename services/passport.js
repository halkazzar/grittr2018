const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const keys = require ('../config/keys');

const User = mongoose.model('users');

console.log('PASSPORT.JS');

passport.serializeUser((user, done) => {
    console.log ('Passport.js:serialize user');
    done(null, user.id);
    });

passport.deserializeUser((id, done) => {
    console.log('Passport.js: deserialize user');
    User.findById(id).then(user=> {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://ec2-52-35-62-29.us-west-2.compute.amazonaws.com:8080/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) =>{
        console.log('Passport.js: Google Strategy callback');        
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                console.log('passport.js: Mongo Call');
                if (existingUser) {
                        console.log('passport.js: existing User: '+existingUser);
                        done(null, existingUser);
                     } else {
                         // we already have a record with a gived id
                         console.log('passport.js: new User: ' + profile.id);
                         new User ({ googleId: profile.id})
                        .save()
                        .then (user => done (null, user));
                     }

                })
    console.log('access token', accessToken);
    console.log('refresh tojen', refreshToken);
    console.log('profile:', profile);
    })
);//creates a new instance of Passport Google Strategy
    
