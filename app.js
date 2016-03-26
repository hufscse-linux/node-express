var express = require('express');
var path    = require("path");

var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
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
