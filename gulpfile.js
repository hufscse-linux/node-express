var gulp    = require('gulp'),
    gls     = require('gulp-live-server'),
    bg      = require('gulp-bg'),
    mocha   = require('gulp-mocha');

var config  = require('./config'),
    mkdirp  = require('mkdirp'),
    mongoose = require('mongoose');

gulp.task(
    'mkdir-local-mongodb',
    function() { mkdirp('tmp/mongo-data'); });

gulp.task(
    'run-local-mongodb',
    ['mkdir-local-mongodb'],
    bg("mongod",
       "--dbpath=" + __dirname + "/tmp/mongo-data",
       "--quiet"
      )
);

gulp.task(
    'run-local-redis',
    bg("redis-server"));

gulp.task(
    'default',
    ['run-local-mongodb', "run-local-redis"],
    function() {
        var server = gls('src/instance.js');
        setTimeout(function() { server.start(); }, 1000);

        gulp.watch('src/app.js', function() {
            server.start.bind(server);
        });
    });


gulp.task(
    'clear-fixtures',
    function(done) {
        var mongoose = require('mongoose');
        var testing_env = config.get_environment('testing');
        var fixtures = require('node-mongoose-fixtures');
        var Post = require('./src/models/post').Post;
        setTimeout(function() {
            db = mongoose.createConnection(testing_env.MONGODB_URI);
            fixtures.reset('Post', db, function() { done(); });
        }, 1000);
    });

gulp.task(
    'load-fixtures',
    ['clear-fixtures'],
    function(done) {
        var mongoose = require('mongoose');
        var testing_env = config.get_environment('testing');
        var fixtures = require('node-mongoose-fixtures');
        var Post = require('./src/models/post').Post;
        setTimeout(function() {
            db = mongoose.createConnection(testing_env.MONGODB_URI);
            fixtures({
                Post: [
                    {title: 'Title1', body: 'body of Title1'},
                    {title: 'Title2', body: 'body of Title2'},
                    {title: 'Title3', body: 'body of Title3'},
                ]
            }, db, function(err, data){
                if(err) done(err);
                done();
            });
        }, 1000);
    });

gulp.task(
    'mocha',
    ['load-fixtures'],
    function() {
        return gulp.src('./test/*.js')
            .pipe(mocha())
            .once('error', function() {
                process.exit(1);
            })
            .once('end', function() {
                process.exit();
            });
    });

gulp.task(
    'test',
    ['run-local-mongodb', 'run-local-redis', 'mocha']);
gulp.task(
    'travis-ci',
    ['mocha']);
