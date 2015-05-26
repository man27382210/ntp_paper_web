var mongoose = require('mongoose')
  , logger = require('../models/Logger').getLogger('mongodb.log')
  ;

var _self;
function MongooseManager() {
	_self = this;
}

/**
 * Please note that the getManager function both have a return value and the 
 * callback function. It is because while value returning, the actual database
 * connection is not ready.
 * 
 * Neil_20130902: I'm not sure the mongoose is sync or not.
 */
MongooseManager.prototype.getManager = function(keyspace, callback)
{
	var dbmgr = mongoose.connect(GLOBAL.MONGODB_HOST + keyspace);
	if (callback) callback(null, dbmgr);
};

module.exports = new MongooseManager();

