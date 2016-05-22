var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
    title: String, 
    body: String, 
    date: { type: Date, default: Date.now},  
});

module.exports = { Post : Post };
