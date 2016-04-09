var gulp  = require('gulp'),
    gls   = require('gulp-live-server'),
    bg    = require('gulp-bg'),
    mkdirp= require('mkdirp');

gulp.task('mkdir-local-mongodb', function() { mkdirp('tmp/mongo-data'); });
gulp.task('run-local-mongodb', ['mkdir-local-mongodb'],
          bg("mongod", "--dbpath=" + __dirname + "/tmp/mongo-data"));


gulp.task('default', ['run-local-mongodb'], function() {

    var server = gls.new('src/app.js');
    server.start();

    gulp.watch('src/app.js', function() {
        server.start.bind(server);
    });
});
