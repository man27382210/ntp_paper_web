var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_platform_db = require('./Ntp_Platform')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId; 

var the_model = GLOBAL.MONGOOSE.model('Ntp_Crs_TOPSIS_Compare', new GLOBAL.MONGOOSE.Schema({ any: {} }), "ntp_crs_TOPSIS_compare");

/**
 * The exports functions.
 */

exports.index = function(callback) {
	the_model.find().lean().exec(function(err, crs) {
		async.each(crs, function(cr, done){
			value = [];
			list_return = {};
			plat_id_list = [];
			value.push(cr["cr_name"]);
			for(var i =0; i<638; i++){
				value.push(cr["plat_c_list"][i]["accuracy"]);
				plat_id_list.push(cr["plat_c_list"][i]["plat_id"]);
			}
			cr["value"] = value;
			cr["plat_id_list"] = plat_id_list;
			done(null);
		}, function(err){
			//get plat
			plat_id_list = crs[0]["plat_id_list"];
			plat_list = [];
			async.each(plat_id_list, function(plat_id, done){
				ntp_platform_db.get(plat_id, function(err, plat){
					plat_list.push(plat);
					done(null);
				});
			}, function(err){
				list_return["plats"] = plat_list;
				list_return["crs"] = crs;
				callback(null, list_return);
			});

		});
	});
};