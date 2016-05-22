var request = require('supertest');
var assert = require('chai').assert;
var app = require('../src/app.js')('testing');

var Post = require('../src/models/post').Post;

describe('Post Controllers', function() {

    it('should list All posts on GET /posts', function(done) {
        request(app)
            .get('/posts')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should create one post on POST /posts/new', function(done) {
        var title = 'some_test_title';
        var body = 'somebody';
        request(app)
            .post('/posts/new')
            .field('title', title)
            .field('body', body)
            .end(function(err, res) {
                if(err) return done(err);
                Post.where({title: title})
                    .findOne(function(err, post){
                        if(err) done(err);
                        assert.notEqual(null, post);
                        assert.equal(post.title, title);
                        assert.equal(post.body, body);
                        
                        done();
                    });
            });
    });

    it('should show post page on GET /posts/<id>', function(done) {
        var title = 'some_test_title';
        var body = 'somebody';
        Post.create({
            title: title,
            body: body
        }, function(err, post) {
            request(app)
                .get('/posts/' + post._id)
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                });
        });
    });

    it('should show edit post page on GET /posts/<id>/edit', function(done) {
        Post.findOne().exec(function(err, post) {
            if(null === post) throw "maybe no fixtures are exist on mongodb";
            request(app)
                .get('/posts/' + post._id + '/edit')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                });
        });
    });

    it('should edit post on POST /posts/<id>/edit', function(done) {
        request(app)
            .post('/posts/<id>/edit')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should delete post on DELETE /posts/<id>', function(done) {
        request(app)
            .delete('/posts/<id>')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });
});
