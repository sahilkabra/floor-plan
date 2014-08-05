//app/app

/**
 * The main app module. Attaches to the port configured after the application has connected to the database
 */
var express = require("express");
var morgan = require('morgan');
var router = require('routes/router');
var config = require('app/config');
var app = express();
var messenger = require('messenger');

app.use(morgan('short'));
app.use(router);
//app.use(error);
messenger.on('plan.dbConnected', function() {
        app.listen(config.express.port);
        console.log('Service (%d) started on port %d', config.pid, config.express.port);
});
