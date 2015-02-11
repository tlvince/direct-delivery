'use strict';
/*eslint-env node */

var pkg = require('../package.json');
var extend = require('extend');

var env = process.env.NODE_ENV || 'development';

var defaults = {
  config: {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    localDB: 'deliveries',
    dateFormat: 'yyyy-MM-dd',
    designDocs: [
      '_design/delivery-rounds',
      '_design/daily-deliveries',
      '_design/product-storages'
    ],
    coreDocTypes: [
      'product',
      'productStorage'
    ]
  }
};

var config = {
  config: require('./' + env + '.json')
};

module.exports = extend(true, {}, defaults, config);
