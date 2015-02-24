'use strict';

var fs = require('fs');
var del = require('del');
var argv = require('optimist').argv;
var gulp = require('gulp');
var async = require('async');
var cordova = require('cordova-lib').cordova;
var cordovaIcon = require('cordova-icon');

var common = require('../gulp/common');

function clean(cb) {
  del('cordova', cb);
}

function init(cb) {
  fs.mkdir('cordova', cb);
}

function symlinkConfig(cb) {
  process.chdir('cordova');
  fs.symlink('../config.xml', 'config.xml', cb);
}

function symlinkWWW(cb) {
  fs.symlink('../dist', 'www', cb);
}

function symlinkIcon(cb) {
  fs.symlink('../src/assets/images/app-direct-delivery-2048.png', 'icon.png', cb);
}

function cordovaAdd(cb) {
  cordova.platform('add', 'android', cb);
}

function generateIcons(cb) {
  cordovaIcon.generate()
    .then(cb)
    .catch(cb);
}

function symlinkBuildProperties(cb) {
  fs.symlink('../../../.android/ant.properties', 'platforms/android/ant.properties', cb);
}

function symlinkKeystore(cb) {
  fs.symlink('../../../.android/ehealth.keystore', 'platforms/android/ehealth.keystore', cb);
}

function cordovaReleaseBuild(cb) {
  var options = ['--release'];
  cordova.build({options: options}, cb);
}

function cordovaDebugBuild(cb) {
  cordova.build(cb);
}

/**
 * Accepted parameters:
 *   --release : build release apk (default is debug apk)
 */
gulp.task('cordova-build', function(done) {
  function finish(err) {
    process.chdir('..');
    done(err);
  }
  var steps = [
    clean,
    init,
    symlinkConfig,
    symlinkWWW,
    symlinkIcon,
    cordovaAdd,
    generateIcons
  ];
  var release = [
    symlinkBuildProperties,
    symlinkKeystore,
    cordovaReleaseBuild
  ];
  if (argv.release || common.build.release) {
    steps = steps.concat(release);
  } else {
    steps.push(cordovaDebugBuild);
  }
  async.series(steps, finish);
});

gulp.task('cordova-move', ['cordova-build'], function(done) {
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

  var steps = [
    cleanBuild,
    initBuild,
    common.packageJSON,
    formatAPKPaths,
    symlinkAPK
  ];

  async.waterfall(steps, done);
});

gulp.task('cordova', ['cordova-build', 'cordova-move']);
