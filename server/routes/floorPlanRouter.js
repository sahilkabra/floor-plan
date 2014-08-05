var router = require('express').Router();
var plan = require('app/floorPlan');

var getBuildings = function(req, res) {
        var buildings = plan.getBuildings();
        res.json(buildings);
};

var getBuilding = function(req, res) {
        var building = plan.getBuilding(req.params.buildingName);
        if (building) res.json(building);
        else res.send(404);
};

var getFloors = function(req, res) {
        var floors = plan.getFloors(req.params.buildingName);
        if (floors) res.json(floors);
        else res.send(404);
};

router.get('/buildings', getBuildings);
router.get('/buildings/:buildingName', getBuilding);
router.get('/buildings/:buildingName/floors', getFloors);
module.exports = router;
