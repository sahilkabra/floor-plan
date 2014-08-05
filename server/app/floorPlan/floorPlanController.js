//floorPlan/floorPlanController

/**
 * This is the main controller for the floor plans module.
 * It serves as an interface for retrieving information.
 */

var stores =  {};

stores['buildingStore'] = require('./building/buildingStore');
stores['floorStore'] = require('./floor/floorStore');

var get = function(what, criteria) {
        return stores[what + 'Store'].get(criteria);
};

exports.getBuildings = function(criteria) {
        return get('building', criteria);
};

exports.getFloors = function(criteria) {
        return get('floor', criteria);
};
