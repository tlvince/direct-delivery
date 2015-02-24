'use strict';

var fs = require('fs');

exports.packageJSON = function(cb) {
  function done(err, file) {
    if (err) {
      return cb(err);
    }
    var json = JSON.parse(file);
    cb(null, json);
  }
  fs.readFile('package.json', 'utf-8', done);
}

exports.build = {
  env: 'development'
};
