'use strict';

var mongoose = require('mongoose');
var express  = require('express');
var path     = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);

var Post = require("./model/post");

var app = express();
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

app.set('view engine', 'jade');

mongoose.connect("mongodb://localhost/test");

app.get('/', function (req, res) {
    var params = {};

    if(req.session.username) {
        params["username"] = req.session.username;
    }
    
    res.render('index', params);
});

app.get('/signin', function (req, res) {
    res.render('signin', {});
});

var users = [
    { username: 'tomcat', password: 's3cret' },
    { username: 'tiger', password: 'scott' }
];

app.post('/signin', function (req, res) {
    var found = false;
    var ui = req.body;
    for(var i in users) {
        if((users[i].username == ui.username) &&
           (users[i].password == ui.password)) {
            found = true;
            break;
        }
    }
    if(found) {
        req.session.username = ui.username;
        res.redirect("/");
    } else {
        res.render("signin", {
            errorMessage: "Can't sign in"
        });
    }
});

app.get('/signout', function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
