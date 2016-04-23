'use strict';

var mongoose = require('mongoose');
var express  = require('express');
var path     = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);

var router = express.Router();

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    session({
        store: new RedisStore(),
        secret: 's3cret',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30000 }
    })
);

mongoose.connect("mongodb://localhost/test");

var root_controller = require("./controllers/root_controller");
var signin_controller = require("./controllers/signin_controller");
var signout_controller = require("./controllers/signout_controller");

router.get('/', root_controller);
router.get('/signin', signin_controller.page);
router.post('/signin', signin_controller.action);
router.get('/signout', signout_controller);

app.use("/", router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
