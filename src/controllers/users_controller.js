var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

module.exports = function(app) {
    router.get('/', function(req, res) {
        res.render('post');
    });

    app.use("/users", router);
};
