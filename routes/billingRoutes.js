const keys = require ('../config/keys');
const stripe = require ('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // adding requireLogin as a reference to the function
    app.post('/api/stripe', requireLogin, async (req,res) => {
       const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description:'$5 for tethacorn',    
            source: req.body.id
       });
      //access use model for current user and update their credit
      req.user.credits += 5;
      const user =  await req.user.save();
      res.send(user);
   });
};
