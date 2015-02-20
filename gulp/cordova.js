'use strict';

var gulp = require('gulp');
var cordova = require('cordova');
var async = require('async');
var argv = require('optimist').argv;
var $ = require('gulp-load-plugins')();

/**
 * Accepted parameters:
 *   --release : build release apk (default is debug apk)
 */
gulp.task('cordova', function(done) {
  process.chdir('./cordova');

  async.series([
    function(cb) {
      $.del(['./www', './platforms', './plugins'], cb);
    },
    function(cb) {
      gulp.src(['../dist/**'], {base: '../dist'})
        .pipe(gulp.dest('./www'))
        .on('end', cb)
        .on('error', cb);
    },
    function(cb) {
      cordova.platform('add', 'android', cb);
    },
    function(cb) {
      var options = [];
      if (argv.release === true) {
        options.push('--release');
      }

      cordova.build({options: options}, cb);
    }
  ], function(err) {
    process.chdir('..');
    done(err);
  });
});
