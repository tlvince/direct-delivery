'use strict';

angular.module('packing')
  .controller('PackingCtrl', function(couchdb) {
    var params = {
      view: 'drivers',
      /*eslint-disable camelcase */
      include_docs: true
      /*eslint-enable camelcase */
    };
    this.drivers = couchdb.view(params);
  });
