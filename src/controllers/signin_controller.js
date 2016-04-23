var mongoose = require('mongoose');
var User = require("../models/user")(mongoose);

var page = function(req, res) {
    res.render('signin', {});
};

var action = function(req, res) {
    var ui = req.body;

    User.findOne(ui, function(err, e) {
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

module.exports = {
    page: page,
    action: action
};
