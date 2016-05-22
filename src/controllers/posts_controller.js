var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Post = require("../models/post").Post;

router.get('/', function(req, res) {
    // var allOfPosts = new Post();
    Post.find({}, function(err, docs){
        if (err){
            console.log(err)
        }
        res.render('posts/index', {
            docs : docs
        })
    });
});

router.get('/new', function(req, res) {
    res.render('posts/new', {});
});

router.post('/new', function(req, res){
    var newPostInfo = req.body;
    var newPost = new Post();
    newPost.title = newPostInfo.title;
    newPost.body = newPostInfo.body;
    newPost.date = Date.now()
    newPost.save(function (err) {
        if(err){
            console.log(err);
        }
        res.redirect('posts/' + newPost._id);
    });
});

router.get("/:id", function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if(err) { return; }
        res.render('posts/show',{post: post});
    });    
});

router.get("/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts/edit',{post: post});
    });
});

router.post("/:id/edit", function(req, res) {
    Post.findOneAndUpdate(
        {_id: req.params.id},
        {title: req.body.title, body: req.body.body},
        function(err) {
            if(err) {
                console.log("!");
                return;
            }
            res.redirect('/posts/' + req.params.id);
        });
});

module.exports = function(app) {
    app.use("/posts", router);
};
