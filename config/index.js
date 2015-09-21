'use strict';
/*eslint-env node */

var extend = require('extend');

var pkg = require('../package.json');
var common = require('../gulp/common');

var defaults = {
  config: {
    name: pkg.name,
    version: pkg.version,
    localDB: 'deliveries',
    dateFormat: 'yyyy-MM-dd',
    designDocs: [
      '_design/delivery-rounds',
      '_design/daily-deliveries',
      '_design/product-storages',
      '_design/replication',
      '_design/kpi',
      '_design/product-storages',
      '_design/packing',
      '_design/docs'
    ],
    coreDocTypes: [
      'product',
      'productStorage'
    ]
  }
};

exports.get = function() {
  var config = {
    config: require('./' + common.build.env + '.json')
  };
  return extend(true, {}, defaults, config);
};
