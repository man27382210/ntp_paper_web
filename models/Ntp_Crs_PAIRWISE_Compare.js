var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_platform_db = require('./Ntp_Platform')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId; 

var the_model = GLOBAL.MONGOOSE.model('Ntp_Crs_PAIRWISE_Compare', new GLOBAL.MONGOOSE.Schema({ any: {} }), "ntp_crs_PAIRWISE_compare");

/**
 * The exports functions.
 */
exports.index = function(callback) {
	the_model.find().lean().exec(function(err, crs) {
		async.each(crs, function(cr, done){
			value = {};
			plat_id_list = [];
			for(var i =0; i<638; i++){
				value[cr["cr_plat_bill_cor_list"][i]["plat_id"]] = cr["cr_plat_bill_cor_list"][i]["accuracy"] + cr["cr_plat_news_cor_list"][i]["accuracy"] + cr["cr_plat_bill_join_cor_list"][i]["join_count"]+ cr["cr_plat_news_pn_cor_list"][i]["join_count"];
				plat_id_list[i] = cr["cr_plat_bill_cor_list"][i]["plat_id"];
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
				crs.push(plat_list);
				callback(null, crs);
			});

		});
	});
};

exports.get = function(id, callback) {
	the_model.find({"_id": id}).lean().exec(function(err, plat) {
		callback(null, plat[0]);	
	});
};