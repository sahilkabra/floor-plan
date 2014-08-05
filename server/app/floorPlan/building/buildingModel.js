//building/buildingModel.js

/**
 * Access the DB layer to query and fetch the building documents
 */
var mongoClient = require('mongodb').MongoClient;
var config = require('app/config').mongo;
var appEvent = require('app/pubSub');

var db; 
mongoClient.connect(config.url, function(err, database) {
        if (err) throw err;
        db = database;
        appEvent.emit('plan.dbConnected');
});
