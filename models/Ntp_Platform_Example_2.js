var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId;
var the_model = GLOBAL.MONGOOSE.model('Ntp_Platform_Example_2', new GLOBAL.MONGOOSE.Schema({any: {} }), "ntp_platform_example");

/**
 * The exports functions.
 */
exports.index = function(callback) {
	the_model.find().lean().exec(function(err, plats) {
		callback(plats);
	});
};