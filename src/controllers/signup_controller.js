var express = require('express'),
    router = express.Router();

var mongoose = require('mongoose');
var User = require("../models/user").User;

var page = function(req, res) {
    res.render('signup', {});
};

var action = function(req, res){
    var ui = req.body
    User.findOne({username : ui.username}, function(err, e){
        console.log(err);
        console.log(e);
        if(err){
            //error handling
        }
        if(null == e){
            console.log('can')
            var newUser = new User();
            newUser.username = ui.username;
            newUser.password = ui.password;
            newUser.save(function (err) {
                if (err){
                    console.log("insert error")
                    //error handling
                }
                res.redirect("/");
            });
        } else {
            res.render("signup", {
                errorMessage: "already exist username"
            });
        }
    });
};



module.exports = function(app) {
    router.get('/signup', page);
    router.post('/signup', action);

    app.use('/', router);
};
