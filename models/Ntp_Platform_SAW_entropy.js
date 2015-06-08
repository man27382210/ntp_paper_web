var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_Platform_db = require('./Ntp_Platform')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId;
var the_model = GLOBAL.MONGOOSE.model('Ntp_Platform_SAW_Entropy', new GLOBAL.MONGOOSE.Schema({any: {} }), "ntp_platform_SAW_entropy");

/**
 * The exports functions.
 */
exports.index = function(callback) {
	the_model.find().lean().exec(function(err, plats) {
		async.each(plats, function(plat, next){
			ntp_Platform_db.get(plat._id, function(err, plat_use){
				plat["plat_origin"] = plat_use["plat_origin"];
				next(null);
			});
		}, function(err){
			callback(null, plats);
		});
		
	});
};

exports.getCr_Plats = function(callback) {
	the_model.find().lean().exec(function(err, plats) {
		crs_array = [];
		crs = {};
		async.each(plats, function(plat, done) {
			if(!crs[plat["cr_id"]]) {
				crs[plat["cr_id"]] = [];
			}
			crs[plat["cr_id"]].push(plat);
			done(null);
		}, function(err){
			array_crs = [];
			for(var key in crs){
				name = "";
				array = crs[key];
				array_element = [];
				for (var i =0 ; i < 638 - array.length; i++){
					array_element.push(0);
				}
				for(var i in array){
					var element = array[i]
					for(var j in plats){
						if(element["_id"] == plats[j]["_id"]){
							name = element["name"];
							array_element.splice(j, 0, element["plat_amount"]);
						}
					}
					
				}
				array_element.splice(0, 0, name);
				array_crs.push(array_element);
			}
			callback(null, array_crs)
		});
	});
}