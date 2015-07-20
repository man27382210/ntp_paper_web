var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_Platform_db = require('./Ntp_Platform')
  , ntp_News_db = require('./Ntp_News_Example')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId;
var the_model = GLOBAL.MONGOOSE.model('Ntp_Plat_News_Example', new GLOBAL.MONGOOSE.Schema({
	value: Number,
	_id: String
	}), "ntp_plat_news_ground");

/**
 * The exports functions.
 */
exports.index = function(callback){
	the_model.find(function(err, items) {
		callback(items);
	});
}

exports.createOrCreate = function(data, callback) {

	var create = function(){
		var the_item = new the_model(data)
		the_item.save(function(err, item){
			console.log(err);
			console.log(item);
			callback(item);
		})
	}
	this.get(data["_id"], function(item){
		if(item){
			console.log("no item");
			item.value = data["value"];
			item.save(function(err, item){
				callback(item);
			})
		}else{
			create();
		}
	});
};


exports.get = function(id, callback) {
	the_model.findById(id, function(err, item) {
		callback(item);
	});
};