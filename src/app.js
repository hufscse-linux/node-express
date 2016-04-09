'use strict';

var express = require('express');
var path    = require("path");

var app = express();
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Title',
        message: 'Message',
        line: "This is Line",
        array: [
            "first", "second", "third", "forth"
        ]
    });
    //res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/test12', function (req, res) {
    res.render('test', {});
});

app.get('/test123', function (req, res) {
    res.render('test123', {});
});

app.get('/test', function (req, res) {
    res.send({
        key: "test",
        value: "testdata"
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
