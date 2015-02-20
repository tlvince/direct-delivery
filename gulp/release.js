'use strict';

var $ = require('gulp-load-plugins')();
var fs = require('fs');
var gulp = require('gulp');

var manifests = [
  'package.json',
  'bower.json',
  'config.xml'
];

function getVersion(cb) {
  function done(err, file) {
    if (err) {
      throw err;
    }
    var version = JSON.parse(file).version;
    cb(version);
  }
  fs.readFile('package.json', 'utf-8', done);
}

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
  function thenCommit(version) {
    commit(version, thenTag);
  }
  getVersion(thenCommit);
});
