const requireLogin = require ('../middlewares/requireLogin');

module.exports = app => {
    app.get ('/api/grits', requireLogin, async (req, res) => {

    var AWS = require('aws-sdk');
    var connectionClass = require('http-aws-es');
    var elasticsearch = require('elasticsearch');
    var creds = new AWS.EnvironmentCredentials('AWS');

    let elasticClient = new elasticsearch.Client({
    host: 'https://search-grittr2018-tlya2nd5u24q77prmjvdjeznn4.us-west-2.es.amazonaws.com',
        log: 'debug',
        connectionClass: connectionClass,
        awsConfig: new AWS.Config({region:'us-west-2'}),
        amazonES: {
            credentials: creds
        }
    });

    const response = await elasticClient.search({
          index: 'grits',
            q: 'task'
    });

    res.send(response); 
        
    });
    
};

