//building/buildingModel.js

/**
 * Access the DB layer to insert/update/retrieve the building documents
 *
 * Provides
 * getByCriteria: To fetch all buildings that meet a certain criteria
 * getAll: To fetch all buildings
 * add: Adds building information to the database
 * addAll: Adds an array of buidings to the database
 *
 * Listens to:
 * ".exit" to shut down the db connection.
 * Global Emits:
 * ".dbConnected": Once the db connnection has been established
 * ".dbExit": Once the db connection has been closed
 */
var mongoClient = require('mongodb').MongoClient;
var config = require('app/config').mongo;
var appName = require('app/config').appName
var messenger = require('messenger');

var COLLECTION_NAME = 'buildings';
var db;
var model = module.exports;

/**
 * Convienience method to get all the buildings.
 *
 * @return A promise that returns all the buildings when they are fetched from the database
 * @emits ".fetched" When the data has been fetched from the database
 */
model.getAll = function() {
	return getByCriteria();
};

/**
 * This returns all the buildings that match the specified criteria.
 * The criteria may be passed as NULL to fetch all buildings
 *
 * @param criteria Optional. The filter criteria.
 * @return A promise that returns the buildings when they are fetched from the databse
 * @emits ".fetched" when all the data has been fetched from the database
 * @emits ".data" when data is available. This is to work with the data as soon as it becomes available
 * @emits ".error" if error occurs while fetching data
 */
model.getByCriteria = function(criteria) {
	var findCriteria = criteria? criteria : {};
	var cursor = db.collection.find(criteria);
	var buildings = [];
	return new Promise(function(resolve, reject) {
			cursor.each(function(err, building) {
				if (err) {
					messenger.emit(appName + ".error", err);
					reject(err);
				}
				if (!building) {
					messenger.emit(appName + ".fetched", buildings);
					resolve(buidings);
				} else {
					messenger.emit(appName + ".data", building);
					buildings.push(building);
				}
			});
		});
};

/**
 * Adds a building to the database.
 * @param building The building to add
 * @emits ".success" when the building has been successfully added. The persisted building is returned
 */
model.add = function(building) {
	addAll([building]);
};


/**
 * Adds all the buildings to the database.
 * @param buildings A list of buildings to add
 * @return A promise object. When the promise is resolved, it will contain the inserted buildings
 * @emits ".success" when all the buildings have been successfully added. The persisted buildings are returned
 */
model.addAll = function(buildings) {
	return new Promise(function(resolve, reject) {
		db.collection(COLLECTION_NAME).insert(buidings,
			function(err, insertedBuildings) {
				if (err) {
					messenger.emit(appName + ".error", err);
					reject(err);
				}
				messenger.emit(appName + ".success", insertedBuildings);
				resolve(insertedBuidings);
			});
		});
};

//Private methods
mongoClient.connect(config.url, function(err, database) {
		if (err) throw err;
		db = database;
		messenger.emit(appName + '.dbConnected');
});

messenger.once(appName + '.exit', function() {
		db.close();
		messenger.emit(appName + '.dbExit');
});
