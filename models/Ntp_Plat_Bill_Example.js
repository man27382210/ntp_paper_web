var moment = require('moment')
  , logger = require('./Logger').getLogger('item.log')
  , async = require('async')
  , ntp_Platform_db = require('./Ntp_Platform')
  , q = require('q')
  ;

var ObjectId = GLOBAL.MONGOOSE.Types.ObjectId;
var the_model = GLOBAL.MONGOOSE.model('Ntp_Plat_Bill_Example', new GLOBAL.MONGOOSE.Schema({any: {} }), "ntp_plat_bill_ground");

/**
 * The exports functions.
 */