var express = require('express'),
    router = express.Router();

module.exports = function(app) {
    router.get("/", function(req, res) {
        var params = {};

        if(req.session.username) {
            params["username"] = req.session.username;
        }
        
        res.render('index', params);
    });

    app.use("/", router);
};
