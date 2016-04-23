module.exports = function(req, res) {
    var params = {};

    if(req.session.username) {
        params["username"] = req.session.username;
    }
    
    res.render('index', params);
};
