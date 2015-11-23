'use strict';

var fs = require('fs');
var rimraf = require('rimraf');
var argv = require('optimist').argv;
var gulp = require('gulp');
var gutil = require('gulp-util');
var async = require('async');
var cordova = require('cordova-lib').cordova;
var cordovaIcon = require('cordova-icon');
var plugins = require('../../cordova-plugins.json').plugins;

var common = require('../../gulp/common');

var ROOT = process.cwd();
// Cordova requires the current working directory to be its project path. All
// paths henceforth are relative to this directory.
var CORDOVA_ROOT = 'cordova';

function chdir(path, cb) {
  var err;
  try {
    process.chdir(path);
    gutil.log('Working directory changed to', process.cwd());
  } catch (e) {
    err = e;
  }
  cb(err);
}

function clean(done) {
  function rmrf(cb) {
    rimraf(CORDOVA_ROOT, cb);
  }
  function mkdir(cb) {
    fs.mkdir(CORDOVA_ROOT, cb);
  }
  function chdirCordova(cb) {
    chdir(CORDOVA_ROOT, cb);
  }
  var steps = [
    rmrf,
    mkdir,
    chdirCordova
  ];
  async.series(steps, done);
}

function cordovaAdd(cb) {
  gutil.log('Adding Android platform');
  cordova.platform('add', 'android', cb);
}

function generateIcons(cb) {
  cordovaIcon.generate()
    .then(cb)
    .catch(cb);
}

function symlinkReleaseFiles(done) {
  var base = '../../../.android';

  function symlinkBuildProperties(cb) {
    fs.symlink(
      base + '/ant.properties', 'platforms/android/ant.properties', cb);
  }

  function symlinkKeystore(cb) {
    fs.symlink(
      base + '/ehealth.keystore', 'platforms/android/ehealth.keystore', cb);
  }

  var steps = [
    symlinkBuildProperties,
    symlinkKeystore
  ];

  gutil.log('Symlinking release files');
  async.parallel(steps, done);
}

function cordovaReleaseBuild(cb) {
  var options = ['--release'];
  gutil.log('Running Cordova release build');
  cordova.build({options: options}, cb);
}

function cordovaDebugBuild(cb) {
  gutil.log('Running Cordova debug build');
  cordova.build(cb);
}

function logBuildType(buildType) {
  gutil.log('Performing', gutil.colors.cyan(buildType), 'build');
}

function symlinkCordovaResources(done) {
  function symlinkConfig(cb) {
    fs.symlink('../config.xml', 'config.xml', cb);
  }

  function symlinkWWW(cb) {
    fs.symlink('../dist', 'www', cb);
  }

  function symlinkIcon(cb) {
    fs.symlink(
      '../src/assets/images/app-direct-delivery-2048.png', 'icon.png', cb);
  }

  var steps = [
    symlinkConfig,
    symlinkWWW,
    symlinkIcon
  ];

  gutil.log('Symlinking Cordova resources');
  async.parallel(steps, done);
}

function installPlugins(cb) {
  gutil.log('Installing cordova plugins: ', gutil.colors.cyan(JSON.stringify(plugins)));
  cordova.plugins('add', plugins, cb);
}

/**
 * Accepted parameters:
 *   --release : build release apk (default is debug apk)
 */
function cordovaBuild(done) {
  function finish(err) {
    if (err) {
      done(err);
    }
    chdir(ROOT, done);
  }
  var steps = [
    clean,
    symlinkCordovaResources,
    installPlugins,
    cordovaAdd,
    generateIcons
  ];
  var release = [
    symlinkReleaseFiles,
    cordovaReleaseBuild
  ];
  if (argv.release || common.build.release) {
    logBuildType('release');
    steps = steps.concat(release);
  } else {
    logBuildType('debug');
    steps.push(cordovaDebugBuild);
  }
  async.series(steps, finish);
}

gulp.task('cordova-build', cordovaBuild);
