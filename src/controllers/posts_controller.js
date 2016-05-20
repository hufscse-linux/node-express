var mongoose = require('mongoose')
var Post = require("../models/post").Post;


var newPostPage = function(req, res) {
    res.render('newPost', {});
};

//TODO
//if save success redirects /posts
var action = function(req, res){
    var newPostInfo = req.body;
    var newPost = new Post();
    newPost.title = newPostInfo.title;
    newPost.body = newPostInfo.body;
    newPost.date = Date.now()
    newPost.save(function (err) {
        if(err){
            console.log(err);
        }
        console.log(newPost);
        res.redirect('/')
        
    });
}

var postsPage = function(req, res) {
    
}

module.exports = {
    newPostPage : newPostPage,
    action : action
}
