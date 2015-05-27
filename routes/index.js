exports.all_plats_getAllPlats_topsis_json = function(req, res) {
	var ntp_Platform_TOPSIS_db = require('../models/Ntp_Platform_TOPSIS_Entropy');
	ntp_Platform_TOPSIS_db.index(function(err, results){
		res.json(results);
	});
}
exports.getAllPlats_topsis_entropy = function(req, res) {
	var ntp_Platform_TOPSIS_db = require('../models/Ntp_Platform_TOPSIS_Entropy');
	ntp_Platform_TOPSIS_db.index(function(err, results){
		res.render('ntp_plats_TOPSIS_Entropy',{
			ctrl_plats: results
		});
	});
}
exports.getAllPlats_saw_entropy = function(req, res) {
	var ntp_Platform_TOPSIS_db = require('../models/Ntp_Platform_SAW_Entropy');
	ntp_Platform_TOPSIS_db.index(function(err, results){
		res.render('ntp_plats_SAW_Entropy',{
			ctrl_plats: results
		});
	});
}
exports.getAllPlats_topsis_fuzzy = function(req, res) {
	var ntp_Platform_TOPSIS_db = require('../models/Ntp_Platform_TOPSIS_Fuzzy');
	ntp_Platform_TOPSIS_db.index(function(err, results){
		res.render('ntp_plats_TOPSIS_Fuzzy',{
			ctrl_plats: results
		});
	});
}