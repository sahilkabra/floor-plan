/*
 * This is the main router for the application. It will decide which route should 
 * go to which sub module
 */

var router = require('express').Router();
var floorPlanRouter = require('routes/floorPlanRouter');

router.use('/plan', floorPlanRouter);
module.exports = router;
