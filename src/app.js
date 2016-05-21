'use strict';

var mongoose = require('mongoose');
var express  = require('express');
var path     = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);

//mongoose.connect("mongodb://localhost/test");
var mongodb_production = process.env.MONGODB_URI;
var redis_production = process.env.REDISCLOUD_URL;
console.log(process.env.MONGODB_URI)

var http_port = process.env.PORT;

mongoose.connect(mongodb_production);

var router = express.Router();

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    session({
        store: new RedisStore({url: redis_production}),
        secret: 's3cret',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30000 }
    })
);

var root_controller = require("./controllers/root_controller");
var signin_controller = require("./controllers/signin_controller");
var signout_controller = require("./controllers/signout_controller");
var signup_controller = require("./controllers/signup_controller");
var signinRouter = require("./controllers/signin_controller");
var postRouter = require("./controllers/posts_controller");

router.get('/', root_controller);
router.get('/signout', signout_controller);
router.get('/signup', signup_controller.page);
router.post('/signup', signup_controller.action);

app.use("/", router);
app.use("/signin", signinRouter )
app.use('/post', postRouter)


app.listen(http_port);
