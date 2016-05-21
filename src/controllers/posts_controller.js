var express = require('express'),
    router = express.Router();

var mongoose = require('mongoose')
var Post = require("../models/post").Post;
var express = require('express')
var router = express.Router();

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
   // var allOfPosts = new Post();
    Post.find({}, function(err, docs){
        if (err){
            console.log(err)
        }
        res.render('post', {
            docs : docs
        })
    })

}

var editPostPage = function (req, res){
    Post.findById( req.params.post_id, function (err, post){
        if(err){
            console.log(err);
        }
        res.render('editPost', { post : post })
    })
}

var editPost = function(req, res){
    var postInfo = req.body
    console.log(req.body)

    Post.findOneAndUpdate({_id : req.params.post_id}, {title: postInfo.title, body: postInfo.body, date: Date.now()}, function (err, doc){
    res.redirect("/post")
    } );
}

module.exports = function(app) {
    router.get('/new', newPostPage);
    router.get('/', postsPage);
    router.post('/', action);
    router.get('/:post_id/edit', editPostPage)
    router.post('/:post_id', editPost)
    
    app.use('/post', router);
};
