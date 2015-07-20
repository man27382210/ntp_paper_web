var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_Platform_db = require('./Ntp_Platform')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId;
var the_model = GLOBAL.MONGOOSE.model('Ntp_Bills_Example', new GLOBAL.MONGOOSE.Schema({any: {} }), "ntp_bills_example");

/**
 * The exports functions.
 */
exports.index = function(callback) {
	the_model.find().lean().exec(function(err, bills) {
		// async.each(plats, function(plat, next){
		// 	ntp_Platform_db.get(plat._id, function(err, plat_use){
		// 		plat["plat_origin"] = plat_use["plat_origin"];
		// 		next(null);
		// 	});
		// }, function(err){
			callback(bills);
		// });
		
	});
};