'use strict';

var fs = require('fs');
var del = require('del');
var argv = require('optimist').argv;
var gulp = require('gulp');
var async = require('async');
var cordova = require('cordova');
var cordovaIcon = require('cordova-icon');

/**
 * Accepted parameters:
 *   --release : build release apk (default is debug apk)
 */
gulp.task('cordova', function(done) {
  async.series([
    function(cb) {
      del(['cordova'], cb);
    },
    function(cb) {
      fs.mkdir('cordova', cb);
    },
    function(cb) {
      process.chdir('cordova');
      fs.symlink('../config.xml', 'config.xml', cb);
    },
    function(cb) {
      fs.symlink('../dist', 'www', cb);
    },
    function(cb) {
      fs.symlink('../src/assets/images/app-direct-delivery-2048.png', 'icon.png', cb);
    },
    function(cb) {
      cordova.platform('add', 'android', cb);
    },
    function(cb) {
      cordovaIcon.generate()
        .then(cb)
        .catch(cb);
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
