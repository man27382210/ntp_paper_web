var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId; 

var the_model = GLOBAL.MONGOOSE.model('Ntp_Platform', new GLOBAL.MONGOOSE.Schema({ any: {} }), "ntp_platform");

/**
 * The exports functions.
 */
exports.index = function(cr_id, callback) {
	the_model.find({"cr_id":cr_id}).lean().exec(function(err, crs) {
		callback(null, crs);	
	});
};

exports.get = function(id, callback) {
	the_model.find({"_id": id}).lean().exec(function(err, plat) {
		callback(null, plat[0]);	
	});
};