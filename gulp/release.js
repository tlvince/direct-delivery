'use strict';

var git = require('gulp-git');
var gulp = require('gulp');
var bump = require('gulp-bump');

function bumper(type) {
  type = type || 'patch';
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: type}))
    .pipe(gulp.dest('.'));
}

gulp.task('bump', bumper);

gulp.task('bump-major', function() {
  return bumper('major');
});

gulp.task('bump-minor', function() {
  return bumper('minor');
});

gulp.task('bump-patch', function() {
  return bumper('patch');
});

gulp.task('tag', function() {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});
