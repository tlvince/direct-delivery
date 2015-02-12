'use strict';

var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var semver = require('semver');
var bump = require('gulp-bump');
var ngConfig = require('ng-config');
var favicons = require('favicons');
var async = require('async');
var cordova = require('cordova');
var argv = require('optimist').argv;

var config = require('../config');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('styles', ['wiredep', 'injector:css:preprocessor'], function () {
  return gulp.src(['src/app/index.scss', 'src/app/vendor.scss'])
    .pipe($.sass({style: 'expanded'}))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/app/'));
});

gulp.task('injector:css:preprocessor', function () {
  return gulp.src('src/app/index.scss')
    .pipe($.inject(gulp.src([
        'src/{app,components}/**/*.scss',
        '!src/app/index.scss',
        '!src/app/vendor.scss'
      ], {read: false}), {
      transform: function(filePath) {
        filePath = filePath.replace('src/app/', '');
        filePath = filePath.replace('src/components/', '../components/');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    }))
    .pipe(gulp.dest('src/app/'));
});

gulp.task('injector:css', ['styles'], function () {
  return gulp.src('src/index.html')
    .pipe($.inject(gulp.src([
        '.tmp/{app,components}/**/*.css',
        '!.tmp/app/vendor.css'
      ], {read: false}), {
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(gulp.dest('src/'));
});

gulp.task('injector:js', ['injector:css'], function () {
  return gulp.src('src/index.html')
    .pipe($.inject(gulp.src([
        'src/{app,components}/**/*.js',
        '!src/{app,components}/**/*.spec.js',
        '!src/{app,components}/**/*.mock.js'
      ]).pipe($.angularFilesort()), {
      ignorePath: 'src',
      addRootSlash: false
    }))
    .pipe(gulp.dest('src/'));
});

gulp.task('partials', function () {
  return gulp.src('src/{app,components}/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'directDelivery'
    }))
    .pipe(gulp.dest('.tmp/inject/'));
});

gulp.task('html', ['wiredep', 'injector:css', 'injector:js', 'partials'], function () {
  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src('src/*.html')
    .pipe($.inject(gulp.src('.tmp/inject/templateCacheHtml.js', {read: false}), {
      starttag: '<!-- inject:partials -->',
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist/'))
    .pipe($.size({
      title: 'dist/',
      showFiles: true
    }));
});

gulp.task('images', function () {
  return gulp.src('src/assets/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('favicons', function () {
  return favicons({
    source: 'src/assets/images/icon.png',
    dest: 'dist',
    background: '#FFF',
    url: ''
  });
});

gulp.task('clean', function (done) {
  $.del(['dist/', '.tmp/'], done);
});

gulp.task('config', function() {
  var options = {
    constants: config
  };
  var ngconf = ngConfig(options);
  return fs.writeFileSync('src/app/config.js', ngconf);
});

gulp.task('bump', function(done) {
  var newVer = semver.inc(config.config.version, 'patch');

  async.series([
    function(cb) {
      gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({version: newVer}))
        .pipe(gulp.dest('./'))
        .on('end', cb)
        .on('error', cb);
    },
    function(cb) {
      gulp.src(['./cordova/config.xml'])
        .pipe(through.obj(function(file, enc, cb) {
          var contents = file.contents.toString().replace(/version="[\d\.]*"/, 'version="' + newVer + '"');
          file.contents = new Buffer(contents);
          gutil.log('Bumped ' + gutil.colors.magenta('./cordova/config.xml:version') + ' to: ' + gutil.colors.cyan(newVer));
          cb(null, file);
        }))
        .pipe(gulp.dest('./cordova'))
        .on('end', cb)
        .on('error', cb);
    }
  ], done);
});

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
      if (argv.release === true)
        options.push('--release');

      cordova.build({options: options}, cb);
    }
  ], function(err) {
    process.chdir('..');
    done(err);
  });
});

gulp.task('build', ['config', 'html', 'images', 'fonts', 'favicons']);
