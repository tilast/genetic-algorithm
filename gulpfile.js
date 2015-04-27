var gulp = require('gulp');
var browserify = require('gulp-browserify');
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

gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('src/main.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('src/main.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function() {
  return gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('default', ['serve', 'watch']);