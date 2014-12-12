'use strict';

var got = require('got');
var gulp = require('gulp');
var config = require('../config');
var dataModel = require('data-model');

var models = [
  'driver'
];

function instances(factory) {
  var all = [];
  for (var model in factory) {
    all = all.concat(factory[model]);
  }
  return all;
}

gulp.task('fixtures', function() {
  var count = process.argv[4] || 10;
  var url = config.config.db + '/_bulk_docs';
  var factory = dataModel.generate(models, count);
  var docs = {
    docs: instances(factory)
  };
  var options = {
    body: JSON.stringify(docs),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  got.post(url, options, function(err, data) {
    if (err) {
      console.error(data);
      throw err;
    }
  });
});
