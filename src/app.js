var express  = require('express');
var fs = require("fs");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var mongoose = require('mongoose');

var session = require("express-session");
var RedisStore = require("connect-redis")(session);

function bootstrap(config) {
    var app = express();    
    app.set('views', __dirname + "/" + config.express.views);
    app.set('view engine', config.express.view_engine);
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());

    return app;
}

function routes(app) {
    var controllers_dir = __dirname + '/controllers';
    fs.readdirSync(controllers_dir).forEach(function(file) {
        var controllers = require(controllers_dir + '/' + file);
        controllers(app);
    });
}

module.exports = function(app_env) {
    var config = require("../config");
    var app = bootstrap(config);

    var current_env = config.get_environment(app_env) || config.current_environments();

    // database connection
    mongoose.connect(current_env.MONGODB_URI);

    // session configuration
    app.use(
        session({
            store: new RedisStore({url: current_env.REDIS_URI}),
            secret: 's3cret',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 30000 }
        })
    );


    routes(app);
    
    app.listen(current_env.HTTP_PORT);
    return app;
};
