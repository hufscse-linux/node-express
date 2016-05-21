var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Posts', function() {
    it('should list All posts on /posts', function() {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
