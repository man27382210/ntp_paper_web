exports.getAllPlatsJson = function(req, res) {
	var ntp_Platform_TOPSIS_db = require('../models/Ntp_Platform_TOPSIS');
	ntp_Platform_TOPSIS_db.index(function(err, results){
		res.json(results);
	});
}
exports.getAllPlats = function(req, res) {
	var ntp_Platform_TOPSIS_db = require('../models/Ntp_Platform_TOPSIS');
	ntp_Platform_TOPSIS_db.index(function(err, results){
		res.render('ntp_plats_TOPSIS',{
			ctrl_plats: results
		});
	});
}

exports.getAllPlats_all = function(req, res) {
	var ntp_Platform_TOPSIS_db = require('../models/Ntp_Platform_TOPSIS');
	ntp_Platform_TOPSIS_db.index(function(err, results){
		res.render('ntp_plats_TOPSIS_all',{
			ctrl_plats: results
		});
	});
}