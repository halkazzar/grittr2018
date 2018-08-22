const passport = require('passport');
console.log ('routes/authRoutes.js');

module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
    }));

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) => {
            res.send('done');
        }
        );

    app.get('/api/logout', (req, res) => {
            req.logout();
            res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
            console.log('current user');
            console.log(req.user);
            res.send(req.user);
        });

    app.get('/', (req, res) => {
            res.send({hi:'there'});
    });
};
