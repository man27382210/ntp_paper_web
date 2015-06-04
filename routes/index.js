exports.plats_relation = function(req, res) {
	var ntp_Platform_Relation_db = require('../models/Ntp_Platform_Relation');
	ntp_Platform_Relation_db.index(function(err, results){
		res.render('ntp_plats_relation', {
			ctrl_plats: results
		});
	});
}


//topsis group
exports.getAllPlats_topsis_entropy = function(req, res) {
	var ntp_Platform_TOPSIS_entropy_db = require('../models/Ntp_Platform_TOPSIS_Entropy');
	ntp_Platform_TOPSIS_entropy_db.index(function(err, results){
		res.render('ntp_plats_TOPSIS_Entropy',{
			ctrl_plats: results
		});
	});
}
exports.getCr_Plats_topsis = function(req, res) {
	var ntp_Platform_TOPSIS_entropy_db = require('../models/Ntp_Platform_TOPSIS_Entropy');
	ntp_Platform_TOPSIS_entropy_db.getCr_Plats(function(err, results){
		res.render('ntp_plats_TOPSIS_Entropy_sparse',{
			ctrl_plats: results
		});
	});
}

//saw
exports.getAllPlats_saw_entropy = function(req, res) {
	var ntp_Platform_SAW_entropy_db = require('../models/Ntp_Platform_SAW_Entropy');
	ntp_Platform_SAW_entropy_db.index(function(err, results){
		res.render('ntp_plats_SAW_Entropy',{
			ctrl_plats: results
		});
	});
}
exports.getCr_Plats_saw = function(req, res) {
	var ntp_Platform_SAW_entropy_db = require('../models/Ntp_Platform_SAW_Entropy');
	ntp_Platform_SAW_entropy_db.getCr_Plats(function(err, results){
		res.render('ntp_plats_SAW_Entropy_sparse',{
			ctrl_plats: results
		});
	});
}

//pairwise
exports.getAllPlats_pairwise_sort = function(req, res) {
	var ntp_Platform_PAIRWISE_sort_db = require('../models/Ntp_Platform_PAIRWISE_sort');
	ntp_Platform_PAIRWISE_sort_db.index(function(err, results){
		res.render('ntp_plats_PAIRWISE_Sort',{
			ctrl_plats: results
		});
	});
}





