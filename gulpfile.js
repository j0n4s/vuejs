'use_strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var karma = require('karma');

gulp.task('default', function() {

});

gulp.task('default', function (done) {

  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(){ done(); })
  .start();

});

gulp.task('inject', function () {
  var target = gulp.src('./index.html');

  var sources = gulp.src([
    './src/app/*.js',
    './src/app/**/*.js',
    '!./src/app/specs/**'
  ],{ read: false });
 
  return target.pipe(inject(sources))
  .pipe(gulp.dest('./'));
});