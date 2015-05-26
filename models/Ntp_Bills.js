var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId; 
var the_model = GLOBAL.MONGOOSE.model('Ntp_Bills', new GLOBAL.MONGOOSE.Schema({ any: {} }), "ntp_bills");

/**
 * The exports functions.
 */
exports.index = function(callback) {
	the_model.find().lean().exec(function(err, bills) {
		callback(null, bills);	
	});
};

exports.get = function(id, callback) {
	the_model.find({"_id": id}).lean().exec(function(err, bills) {
		callback(null, bills);
	});
};
