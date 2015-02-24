'use strict';

var url = require('url');
var got = require('got');
var glob = require('glob');
var gulp = require('gulp');
var compile = require('couch-compile');
var argv = require('optimist').argv;

var config = require('../config');
var fixtures = require('../couchdb/fixtures');

/**
 * Respects the following command-line arguments:
 *
 * `-u`: database username
 * `-p`: database password
 */
function push(docs) {
  var body = JSON.stringify({
    docs: docs,
    /*eslint-disable camelcase */
    all_or_nothing: true
    /*eslint-enable camelcase */
  });

  var options = {
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // prepare db url and add auth to it if specified as arguments
  var dbUrl = url.parse(config.get().config.db + '/_bulk_docs');
  if (argv.u && argv.p) {
    dbUrl.auth = argv.u + ':' + argv.p;
  }
  dbUrl = url.format(dbUrl);

  return got.post(dbUrl, options, function(err, data) {
    if (err) {
      console.error(data);
      throw err;
    }
    console.log(data);
  });
}

gulp.task('fixtures', function() {
  for (var model in fixtures) {
    var docs = fixtures[model].docs;
    push(docs);
  }
});

gulp.task('views', function() {
  function couchCompile(dir) {
    compile(dir, function(err, docs) {
      if (err) {
        throw err;
      }
      console.log(docs);
      docs = [docs];
      return push(docs);
    });
  }

  glob('couchdb/app/*', function(err, matches) {
    if (err) {
      throw err;
    }
    matches.forEach(couchCompile);
  });
});
