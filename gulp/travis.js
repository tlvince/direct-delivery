'use strict';

var gulp = require('gulp');
var async = require('async');

var common = require('./common');

function isTravis(cb) {
  var err;
  if (!process.env.TRAVIS) {
    var msg = [
      'TRAVIS environment variable is unset',
      'This task assumes it is running within a TravisCI instance'
    ].join('. ');
    err = new Error(msg);
  }
  cb(err);
}

function isPullRequest(cb) {
  var err;
  if (process.env.TRAVIS_PULL_REQUEST !== 'false') {
    var msg = [
      'This job was triggered by a pull request',
      'Builds are disabled in pull requests for security reasons'
    ].join('. ');
    err = new Error(msg);
  }
  cb(err);
}

function setTrigger(cb) {
  if (!process.env.TRAVIS_TAG && process.env.TRAVIS_BRANCH !== 'develop') {
    var msg = [
      'Unsupported branch or untagged commit',
      'Skipping build'
    ].join('. ');
    var err = new Error(msg);
    return cb(err);
  }

  if (process.env.TRAVIS_TAG) {
    common.build.env = 'production';
    common.build.release = true;
    return cb();
  }

  if (process.env.TRAVIS_BRANCH === 'develop') {
    common.build.env = 'stage';
    return cb();
  }
}

function init(done) {
  var steps = [
    isTravis,
    isPullRequest,
    setTrigger
  ];
  async.series(steps, done);
}

gulp.task('travis-init', init);
gulp.task('travis-build', ['travis-init', 'build']);
gulp.task('travis', ['travis-init', 'travis-build'], function() {
  gulp.start('cordova');
});
