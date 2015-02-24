'use strict';

var $ = require('gulp-load-plugins')();
var fs = require('fs');
var gulp = require('gulp');

var common = require('./common');

var manifests = [
  'package.json',
  'bower.json',
  'config.xml'
];

function tag(version, cb) {
  $.git.tag('v' + version, 'Version ' + version, cb);
}

function commit(version, cb) {
  function done() {
    cb(version);
  }
  gulp.src(manifests)
    .pipe($.git.commit('Version ' + version))
    .on('finish', done);
}

gulp.task('bump', function() {
  return $.cordovaBump();
});

gulp.task('release', ['bump'], function(done) {
  function thenTag(version) {
    tag(version, done);
  }
  function thenCommit(err, pkg) {
    if (err) {
      done(err);
    }
    commit(pkg.version, thenTag);
  }
  common.packageJSON(thenCommit);
});
