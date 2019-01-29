const requireLogin = require ('../middlewares/requireLogin');
const amazonES = require('../services/amazones');

module.exports = app => {
    app.get ('/api/grits', requireLogin, async (req, res) => {

   console.log ('query'); 
   const response = await amazonES.elasticClient.search({
          index: 'grits',
            q: 'task'
    });

    res.send(response); 
        
    });
    
};

