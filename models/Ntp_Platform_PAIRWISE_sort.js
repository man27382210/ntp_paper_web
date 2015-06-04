var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_Platform_db = require('./Ntp_Platform')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId;
var the_model = GLOBAL.MONGOOSE.model('Ntp_Platform_PAIRWISE_sort', new GLOBAL.MONGOOSE.Schema({any: {} }), "ntp_platform_PAIRWISE_sort");

/**
 * The exports functions.
 */
exports.index = function(callback) {
	the_model.find().lean().exec(function(err, plats) {
		async.each(plats, function(plat, next){
			ntp_Platform_db.get(plat._id, function(err, plat_use){
				console.log(plat);
				plat["plat_origin"] = plat_use["plat_origin"];
				plat["name"] = plat_use["cr_name"]
				next(null);
			});
		}, function(err){
			callback(null, plats);
		});
		
	});
};