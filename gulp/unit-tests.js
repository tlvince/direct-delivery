'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var merge = require('merge-stream');
var extend = require('extend');
var wiredep = require('wiredep');

function test(options) {
  var defaults = {
    action: 'run',
    configFile: 'karma/karma-unit.conf.js'
  };
  var karmaOpts = extend({}, defaults, options);
  var bowerDeps = wiredep({
    directory: 'bower_components',
    exclude: ['bootstrap-sass-official'],
    dependencies: true,
    devDependencies: true
  });

  var testFiles = gulp.src(bowerDeps.js);
  var src = gulp.src('src/{app,components}/**/*.js')
    .pipe($.angularFilesort());

  return merge(testFiles, src)
    .pipe($.karma(karmaOpts))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
}

gulp.task('test', function() {
  return test();
});

gulp.task('test-watch', function() {
  return test({action: 'watch'});
});

gulp.task('test-coverage', function() {
  return test({configFile: 'karma/karma-coverage.conf.js'});
});
