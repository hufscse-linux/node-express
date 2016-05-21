var mongoose = require('mongoose');
//TODO
//need to check valid user
var Post = mongoose.model('Post', {
    title: String, 
    body: String, 
    date: { type: Date, default: Date.now},  

});

module.exports = { Post : Post };
