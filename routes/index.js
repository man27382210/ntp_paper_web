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
exports.getCr_Plats_topsis_sparse = function(req, res) {
	var ntp_Platform_TOPSIS_entropy_db = require('../models/Ntp_Platform_TOPSIS_Entropy');
	ntp_Platform_TOPSIS_entropy_db.getCr_Plats(function(err, results){
		res.render('ntp_plats_TOPSIS_Entropy_sparse',{
			ctrl_plats: results
		});
	});
}
exports.getCr_Plats_topsis_sparse_each = function(req, res){
	var ntp_Platform_TOPSIS_Compare_db = require('../models/Ntp_Crs_TOPSIS_Compare');
	ntp_Platform_TOPSIS_Compare_db.index(function(err, results){
		res.render('ntp_plats_TOPSIS_Entropy_sparse_each',{
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
exports.getCr_Plats_saw_sparse = function(req, res) {
	var ntp_Platform_SAW_entropy_db = require('../models/Ntp_Platform_SAW_Entropy');
	ntp_Platform_SAW_entropy_db.getCr_Plats(function(err, results){
		res.render('ntp_plats_SAW_Entropy_sparse',{
			ctrl_plats: results
		});
	});
}
exports.getCr_Plats_saw_sparse_each = function(req, res) {
	var ntp_Platform_SAW_Compare_db = require('../models/Ntp_Crs_SAW_Compare');
	ntp_Platform_SAW_Compare_db.index(function(err, results){
		res.render('ntp_plats_SAW_Entropy_sparse_each',{
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
exports.getAllPlats_pairwise_sparse = function(req, res){
	var ntp_Crs_Compare_db = require('../models/Ntp_Crs_PAIRWISE_Compare');
	ntp_Crs_Compare_db.index(function(err, results){
		plat_origin_value_dict = {};
		plat_origin_list = [];
		cr_plats = [];
		plat_form_list = results.pop();
		// res.json(results);
		for (var i=0; i<plat_form_list.length; i++){
			plat_origin_list.push(plat_form_list[i]["plat_origin"]);
		}
		for(var i=0; i<results.length; i++){
			plats_use = [];
			plats_use.push(results[i]["cr_name"]);
			for (var j=0; j<plat_form_list.length; j++){
				plat_id = plat_form_list[j]["_id"];
				plats_use.push(results[i]["value"][plat_id]);
			}
			cr_plats.push(plats_use);
		}
		plat_origin_value_dict["plat_origin_list"] = plat_origin_list;
		plat_origin_value_dict["cr_plats"] = cr_plats;
		res.render('ntp_plats_PAIRWISE_Sort_sparse',{
			ctrl_plats: plat_origin_value_dict
		});
	});
}



//Example
//plat與news 50*50 填寫正確答案
exports.get_plat_news_ground = function(req, res) {
	var Ntp_Platform_Example_db = require('../models/Ntp_Platform_Example_2');
	var Ntp_News_Example_db = require('../models/Ntp_News_Example');
	var async = require('async');
	async.parallel(
		[
			function(finish){
				Ntp_Platform_Example_db.index(function(plats){
					finish(null, plats);
				});
			},
			function(finish){
				Ntp_News_Example_db.index(function(news){
					finish(null, news);
				});
			}
		], function(err, results){
			res.render('ntp_plat_news_ground',{
				ctrl_plat: results[0],
				ctrl_news: results[1]
			});
	});
}

exports.post_plat_news_ground = function(req, res){
	var id = req.body.id;
	var value = req.body.value;
	var data = {"_id":id, "value":value};
	var Ntp_Plat_News_Example_db = require('../models/Ntp_Plat_News_Example');
	Ntp_Plat_News_Example_db.createOrCreate(data, function(result){
		console.log(result);
		res.json(result);
	});
}

exports.get_plat_news_ground_have = function(req, res){
	var Ntp_Plat_News_Example_db = require('../models/Ntp_Plat_News_Example');
	Ntp_Plat_News_Example_db.index(function(results){
		res.json(results);
	});	
}


//plat與bill 50*50 填寫正確答案
exports.get_plat_bill_ground = function(req, res) {
	var Ntp_Platform_Example_db = require('../models/Ntp_Platform_Example_2');
	var Ntp_Bills_Example_db = require('../models/Ntp_Bills_Example');
	var async = require('async');
	async.parallel(
		[
			function(finish){
				Ntp_Platform_Example_db.index(function(plats){
					finish(null, plats);
				});
			},
			function(finish){
				Ntp_Bills_Example_db.index(function(bills){
					finish(null, bills);
				});
			}
		], function(err, results){
			res.render('ntp_plat_bill_ground',{
				ctrl_plat: results[0],
				ctrl_bill: results[1]
			});
	});
}