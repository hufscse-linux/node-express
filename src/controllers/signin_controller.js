var express = require('express'),
    router = express.Router();

var mongoose = require('mongoose');
var User = require("../models/user").User;
var express = require('express')
var router = express.Router();

var page = function(req, res) {
    res.render('signin', {});
};

var action = function(req, res) {
    var ui = req.body;

    User.findOne({username: ui.username, password: ui.password}, function(err, e) {
        console.log(err);
        console.log(e);
        if(err) {
            //error handling
        }
        if(null != e) {
            req.session.username = ui.username;
            res.redirect("/");
        } else {
            res.render("signin", {
                errorMessage: "Can't sign in"
            });
        }
    });
};


module.exports = function(app) {
    router.get('/', page);
    router.post('/', action);

    app.use('/signin', router);
};
