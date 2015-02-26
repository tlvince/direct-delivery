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
};

exports.build = {
  env: process.env.NODE_ENV || 'development'
};

// http://stackoverflow.com/a/19449076
exports.now = function() {
  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  var now = new Date();
  return now.getFullYear() +
         pad2(now.getMonth() + 1) +
         pad2(now.getDate()) +
         pad2(now.getHours()) +
         pad2(now.getMinutes()) +
         pad2(now.getSeconds());
};
