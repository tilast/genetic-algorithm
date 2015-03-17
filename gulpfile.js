var gulp = require('gulp');
var connect = require('gulp-connect');
var karma = require('karma').server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('serve', function () {
  connect.server({
    port: 1234
  });
});

gulp.task('default', ['test']);