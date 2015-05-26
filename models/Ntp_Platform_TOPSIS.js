var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_Platform_db = require('./Ntp_Platform')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId;
var the_model = GLOBAL.MONGOOSE.model('Ntp_Platform_TOPSIS', new GLOBAL.MONGOOSE.Schema({any: {} }), "ntp_platform_TOPSIS");

/**
 * The exports functions.
 */
exports.index = function(callback) {
	the_model.find(function(err, plats) {
		use = [];
		async.each(plats, function(plat, next){
			ntp_Platform_db.get(plat._id, function(err, plat_use){
				var plat_that = JSON.parse(JSON.stringify(plat));
				plat_that["plat_origin"] = plat_use["plat_origin"];
				use.push(plat_that);
				next(null);
			});
		}, function(err){
			callback(null, use);	
		});
		
	});
};