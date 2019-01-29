const AWS = require('aws-sdk');
const connectionClass = require('http-aws-es');
const elasticsearch = require('elasticsearch');
const creds = new AWS.EnvironmentCredentials('AWS');

exports.elasticClient = new elasticsearch.Client({
    host: 'https://search-grittr2018-tlya2nd5u24q77prmjvdjeznn4.us-west-2.es.amazonaws.com',
    log: 'debug',
    connectionClass: connectionClass,
    awsConfig: new AWS.Config({region:'us-west-2'}),
    amazonES: {
        credentials: creds
    }
});

