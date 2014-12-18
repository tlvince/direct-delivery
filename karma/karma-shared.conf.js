'use strict';

module.exports = {
  autoWatch: false,
  basePath: '..',
  frameworks: [
    'jasmine'
  ],
  browsers: [
    'PhantomJS'
  ],
  plugins: [
    'karma-phantomjs-launcher',
    'karma-jasmine'
  ]
};
