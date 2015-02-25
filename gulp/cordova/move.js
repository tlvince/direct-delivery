'use strict';

var fs = require('fs');
var del = require('del');
var argv = require('optimist').argv;
var gulp = require('gulp');
var async = require('async');

var common = require('../../gulp/common');

function formatAPKPaths(pkg, cb) {
  var apkPath = {
    from: '../cordova/platforms/android/ant-build/CordovaApp',
    to: 'build/' + pkg.name
  };
  if (argv.release || common.build.release) {
    apkPath.from += '-release.apk';
    apkPath.to += '-v' + pkg.version + '.apk';
  } else {
    apkPath.from += '-debug.apk';
    apkPath.to += '-' + common.now() + '.apk';
  }
  cb(null, apkPath);
}

function cleanBuild(cb) {
  del('build', cb);
}

function initBuild(cb) {
  fs.mkdir('build', cb);
}

function symlinkAPK(apkPath, cb) {
  fs.symlink(apkPath.from, apkPath.to, cb);
}

function cordovaMove(done) {
  var steps = [
    cleanBuild,
    initBuild,
    common.packageJSON,
    formatAPKPaths,
    symlinkAPK
  ];

  async.waterfall(steps, done);
}

gulp.task('cordova-move', ['cordova-build'], cordovaMove);
