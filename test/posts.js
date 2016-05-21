var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app.js')('test');
var should = chai.should();

chai.use(chaiHttp);

describe('Post Controllers', function() {
    it('should list All posts on GET /posts', function() {
        chai.request(app)
            .get('/posts')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should create one post on POST /posts/new', function() {
        chai.request(app)
            .post('/posts/new')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should show post page on GET /posts/<id>', function() {
        chai.request(app)
            .get('/posts/<id>')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should show edit post page on GET /posts/<id>/edit', function() {
        chai.request(app)
            .get('/posts/<id>/edit')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should edit post on POST /posts/<id>/edit', function() {
        chai.request(app)
            .post('/posts/<id>/edit')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should delete post on DELETE /posts/<id>', function() {
        chai.request(app)
            .delete('/posts/<id>')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
