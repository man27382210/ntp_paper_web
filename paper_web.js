/**
 * Module dependencies.
 */
var express = require('express')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , multer = require('multer')					// for multipart http request
  , session = require('express-session')
  , favicon = require('serve-favicon')
  , loggerMiddleware = require('morgan')
  , http = require('http')
  , path = require('path')
  , Q = require('q')
  , useragent = require('express-useragent')
  , passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , LocalStrategy = require('passport-local').Strategy
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn		// to ensure the user is logged.
  , logger = require('./models/Logger').getLogger('system.log')
  ;

/**
 * Route dependencies.
 **/
var routeIndex = require('./routes/index.js')
  ;
/**
 * Initialize system constants
 **/
function initConstant()
{

	var system = require('./system.json');
	process.env.NODE_ENV =      system.NODE_ENV;
	GLOBAL.HOMEURL = 			'http://' + system[system.NODE_ENV]['context.domain'];
	GLOBAL.SERVERHOST = 		system[system.NODE_ENV]['context.host'];
	GLOBAL.SERVERPORT = 		system[system.NODE_ENV]['context.port'];
	GLOBAL.BASEPATH   = 		system[system.NODE_ENV]['context.path'];
	GLOBAL.FOLDER_UPLOADS = 	path.join(__dirname + '/' + system[system.NODE_ENV]['folder.uploads']);
	GLOBAL.FOLDER_TMP = 		path.join(__dirname + '/' + system[system.NODE_ENV]['folder.tmp']);
	GLOBAL.URL_UPLOADS = 		system[system.NODE_ENV]['url.uploads'];
	GLOBAL.URL_TMP = 			system[system.NODE_ENV]['url.tmp'];
	GLOBAL.FACEBOOK_APP_ID = 		system[system.NODE_ENV]['facebook.app_id'];
	GLOBAL.FACEBOOK_APP_SECRET = 	system[system.NODE_ENV]['facebook.app_secret'];
	GLOBAL.GOOGLE_APP_ID = 			system[system.NODE_ENV]['google.app_id'];
	GLOBAL.GOOGLE_APP_SECRET = 		system[system.NODE_ENV]['google.app_secret'];
	GLOBAL.MONGODB_HOST = 			system[system.NODE_ENV]['mongodb.host'];
	GLOBAL.MONGODB_DBNAME = 		system[system.NODE_ENV]['mongodb.dbname'];
}


/**
 * Initialize database manager
 **/
function initDbmgr()
{
	require('./models/Mongoose').getManager(GLOBAL.MONGODB_DBNAME, function(err, dbmgr) {
		if (err) {
			logger.fatal(err);
			process.exit();
		}
		GLOBAL.MONGOOSE = dbmgr;
		logger.info('Mongoose connection to Keyspace start_up_taiwan is built.');
	});
}

/**
 * Initialize application.
 **/
function initApp() 
{
	var app = express();

	// all environments
	app.set('port', GLOBAL.SERVERPORT || 3000);
	app.set('views', path.join(__dirname + '/views'));
	app.set('view engine', 'jade');
	app.use(favicon(path.join(__dirname + '/public/images/cloudeep.ico')));
	app.use(loggerMiddleware('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(multer({ dest: GLOBAL.FOLDER_TMP }));
	app.use(cookieParser('start_up_taiwan'));
	app.use(session({
		secret: 'cloudeep',
		resave: false,
		saveUninitialized: true
	}));
	// User authentication using Passport module, and it should be placed after express.session().
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(require('stylus').middleware(path.join(__dirname + '/public')));
	app.use(express.static(path.join(__dirname, 'public')));
	// init useragent
	app.use(useragent.express());

	// Every jade page has a locals variable, set various information to it.
	app.use(function (req, res, next) {
		res.locals.user = req.user;
		res.locals.useragent = useragent.parse(req.headers['user-agent']);
		next();
	});

	app.get('/getAllPlats_topsis_entropy', routeIndex.getAllPlats_topsis_entropy);
	app.get('/getAllPlats_saw_entropy', routeIndex.getAllPlats_saw_entropy);
	app.get('/getAllPlats_pairwise_sort', routeIndex.getAllPlats_pairwise_sort);
	app.get('/getCr_Plats_topsis', routeIndex.getCr_Plats_topsis);
	app.get('/getCr_Plats_saw', routeIndex.getCr_Plats_saw);
	app.get('/plats_relation', routeIndex.plats_relation);

	// Route all exceptions (should be the last route) to error page.
	app.use(function(req, res, next) {
		res.render('404', {});
	});

	// The final error handling.
	process.on('uncaughtException', function(err) {
		logger.error(err.stack);
		process.exit(-1);
	});

	process.on('SIGINT', function(err) {
		logger.warn('Terminated by SIGINT.');
		process.exit();
	});

	// The http processes.
	http.createServer(app).listen(app.get('port'), function(){
		logger.info('Express server listening on port ' + app.get('port'));
	});
}

/**
 * Start
 **/
Q
.fcall(initConstant)
.then(initDbmgr)
.then(initApp)
.done();



// TODO_20141024: A cronjob to remove old tmp files.

