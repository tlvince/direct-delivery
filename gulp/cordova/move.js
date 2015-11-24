'use strict';

var fs = require('fs');
var rimraf = require('rimraf');
var argv = require('optimist').argv;
var gulp = require('gulp');
var gutil = require('gulp-util');
var async = require('async');

var common = require('../../gulp/common');

function formatAPKPath(pkg, arch, cb) {
  var apkPath = {
    from: '../cordova/platforms/android/build/outputs/apk/android-' + arch,
    to: 'build/' + pkg.name + '-' + arch
  };
  if (argv.release || common.build.release) {
    apkPath.from += '-release.apk';
    apkPath.to += '-release-v' + pkg.version + '.apk';
  } else {
    apkPath.from += '-debug.apk';
    apkPath.to += '-debug-' + common.now() + '.apk';
  }

  var message = [
    'Symlinking',
    gutil.colors.blue(apkPath.from),
    'to',
    gutil.colors.green(apkPath.to)
  ].join(' ');

  gutil.log(message);
  cb(null, apkPath);
}

function formatAPKPaths(pkg, cb) {
  var architectures = [
    'x86',
    'armv7'
  ];

  function bindArch(arch) {
    return formatAPKPath.bind(null, pkg, arch);
  }

  var steps = architectures.map(bindArch);

  async.parallel(steps, cb);
}

function cleanBuild(cb) {
  rimraf('build', cb);
}

function initBuild(cb) {
  fs.mkdir('build', cb);
}

function symlinkAPK(apkPaths, cb) {
  function bindSymlink(apkPath) {
    return fs.symlink.bind(null, apkPath.from, apkPath.to);
  }

  var steps = apkPaths.map(bindSymlink);

  async.parallel(steps, cb);
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
