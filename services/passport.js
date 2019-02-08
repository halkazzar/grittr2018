const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const keys = require ('../config/keys');

const amazonES = require('./amazones');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
    });

passport.deserializeUser((id, done) => {
    User.findById(id).then(user=> {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) =>{
        const existingUser = await User.findOne({ googleId: profile.id });
    
        // we already have a record with a gived id
        if (existingUser) {
            return done(null, existingUser);
        } 

        // Create new use in Mongo
        const user = await new User ({ googleId: profile.id}).save()

        // add new elasticsearch index for user
        const user_index = await amazonES.elasticClient.indices.create({
            index: user._id.toString()
        });

        done(null, user, user_index);
    }
  )
);//creates a new instance of Passport Google Strategy
    
