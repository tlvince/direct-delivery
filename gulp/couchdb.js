'use strict';

var got = require('got');
var gulp = require('gulp');
var compile = require('couch-compile');
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

function push(docs) {
  var url = config.config.db + '/_bulk_docs';

  docs = JSON.stringify({
    docs: docs
  });

  var options = {
    body: docs,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return got.post(url, options, function(err, data) {
    if (err) {
      console.error(data);
      throw err;
    }
    console.log(data);
  });
}

gulp.task('fixtures', function() {
  var count = process.argv[4] || 10;
  var factory = dataModel.generate(models, count);
  var docs = instances(factory);
  return push(docs);
});

gulp.task('views', function() {
  compile('couchdb/app', function(err, docs) {
    if (err) {
      throw err;
    }
    docs = [docs];
    return push(docs);
  });
});
