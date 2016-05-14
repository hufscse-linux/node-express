var gulp    = require('gulp'),
    gls     = require('gulp-live-server'),
    bg      = require('gulp-bg'),
    mkdirp  = require('mkdirp'),
    phantom = require('gulp-phantom');

gulp.task('mkdir-local-mongodb', function() { mkdirp('tmp/mongo-data'); });
gulp.task('run-local-mongodb', ['mkdir-local-mongodb'],
          bg("mongod", "--dbpath=" + __dirname + "/tmp/mongo-data"));
gulp.task('run-local-redis',
          bg("redis-server"));

gulp.task(
    'default',
    ['run-local-mongodb', "run-local-redis"],
    function() {
        var server = gls(
            'src/app.js',
            {
                env: {
                    MONGODB_URI: "mongodb://localhost/test",
                    REDISCLOUD_URL: "redis://localhost/",
                    PORT: 3000
                }
            }
        );
        setTimeout(function() { server.start(); }, 1000);

        gulp.watch('src/app.js', function() {
            server.start.bind(server);
        });
    });

gulp.task('integration_test', ['default'], function() {
    gulp.src("./integration_test/*.js")
        .pipe(phantom({
            ext: ".json"
        }))
        .pipe(gulp.dest("./tmp/data"))
        .on("error", function() { this.emit("end"); });
});
