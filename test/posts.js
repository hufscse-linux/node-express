var request = require('supertest');

var app = require('../src/app.js')('test');

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
        request(app)
            .post('/posts/new')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should show post page on GET /posts/<id>', function(done) {
        request(app)
            .get('/posts/<id>')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                done();
            });
    });

    it('should show edit post page on GET /posts/<id>/edit', function(done) {
        request(app)
            .get('/posts/<id>/edit')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                done();
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
