//building/buildingStore.js

/**
 * Provides methods to interact and retreive data from the building model
 */
var buildingModel = require('./buildingModel');

/** Get a list of buildings by criteria */
exports.get = function(criteria) {
        if (criteria)   return buildingModel.getByCriteria(criteria);
        return buildingModel.getAll();
};
