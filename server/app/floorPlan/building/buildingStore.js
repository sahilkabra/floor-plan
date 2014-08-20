//building/buildingStore.js

/**
 * Provides methods to interact and retreive data from the building model
 */
var buildingModel = require('./buildingModel');

var buildingStore = module.exports;

/** Returns a Promise that will fetch a list of buildings by the given criteria */
buildingStore.get = function(criteria) {
		if (criteria)	return buildingModel.getByCriteria(criteria);
		return buildingModel.getAll();
};
