'use strict';
/*eslint-env node */

var gulp = require('gulp');

require('require-dir')('./gulp', {recurse: true});

gulp.task('default', ['clean'], function() {
  // TODO: deprecated method. Replace with preferred task serialisation
  // strategy in Gulp 4. See https://github.com/gulpjs/gulp/issues/355
  gulp.start('build');
});
