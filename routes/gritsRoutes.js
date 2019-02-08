const requireLogin = require ('../middlewares/requireLogin');
const amazonES = require('../services/amazones');

module.exports = app => {
//    app.get ('/api/grits', requireLogin, async (req, res) => {
  //     console.log ('query'); 
    //   const response = await amazonES.elasticClient.search({
    //          index: 'grits',
    //            q: 'task'
    ///    });
    //    res.send(response); 
   // });

    app.post('/api/grits', requireLogin, async (req, res) => {
         
        console.log("============ Grits API Called ==============");
        
        const {task, eta, priority, urgency} = req.body;     
        
        const response = await amazonES.elasticClient.index({
              index: req.user.id,
              type: 'type',
              body:{
                  task: task,
                  dateDue: eta,
                  priority: priority,
                  urgency: urgency,
                  dateCreated: Date.now()
              } 
        });

    });
    
};

