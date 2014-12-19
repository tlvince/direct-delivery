'use strict';

var extend = require('extend');
var shared = require('./karma-shared.conf');

module.exports = function(config) {
  var coverage = {
    reporters: [
      'progress',
      'coverage'
    ],
    plugins: shared.plugins.concat([
      'karma-coverage'
    ]),
    preprocessors: {
      'src/{app,components}/**/!(*.spec|*.mock).js': [
        'coverage'
      ]
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    }
  };
  var conf = extend({}, shared, coverage);
  config.set(conf);
};
