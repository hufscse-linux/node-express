var express = require('express'),
    router = express.Router();

module.exports = function(app) {
    router.delete('/signout', function(req, res) {
        req.session.destroy();
        res.redirect("/");
    });
    app.use('/', router);
};
