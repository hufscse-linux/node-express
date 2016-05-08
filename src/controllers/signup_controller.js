var mongoose = require('mongoose');
var User = require("../models/user")(mongoose);

var page = function(req, res) {
    res.render('signup', {});
};

var action = function(req, res){
    var ui = req.body

    
}
module.exports = {
    page: page,
    action: action
};
