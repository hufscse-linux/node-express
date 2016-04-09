'use strict';

var mongoose = require('mongoose');
var express  = require('express');
var path     = require("path");

var Post = require("./model/post");

var app = express();
app.set('view engine', 'jade');

mongoose.connect("mongodb://localhost/test");

app.get('/', function (req, res) {

    Post.find(function(err, entries) {
        var data = entries;
        res.render('index', {
            data: data,
            title: 'Title',
            message: 'Message',
            line: "This is Line",
            array: [
                "first", "second", "third", "forth"
            ]
        });
    });
});

app.get('/generate', function(req, res) {
    var post = new Post({
        title: "New Post", body: "Blank"
    });
    post.save(function(err) {
        console.log(err);
    });
    res.redirect("/");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});






