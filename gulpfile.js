var gulp  = require('gulp'),
    gls   = require('gulp-live-server'),
    bg    = require('gulp-bg'),
    mkdirp= require('mkdirp');



gulp.task('mkdir-local-mongodb', function() { mkdirp('tmp/mongo-data'); });
gulp.task('run-local-mongodb', ['mkdir-local-mongodb'],
          bg("mongod", "--dbpath=" + __dirname + "/tmp/mongo-data"));
gulp.task('run-local-redis',
          bg("redis-server"));

gulp.task(
    'default',
    ['run-local-mongodb', "run-local-redis"],
    function() {
        var server = gls('src/app.js', {env : {     
            MONGODB_URI : "mongodb://localhost/test",
            REDISCLOUD_URI : "redis://localhost " , 
            PORT : 3000
        }
        });
        server.start();

        gulp.watch('src/app.js', function() {
            server.start.bind(server);
        });
    });
