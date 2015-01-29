'use strict';

angular.module('packingTable')
  .service('packingTableLegendService', function(couchdb, couchUtil, STORAGE_ATTRIBUTES) {
    function getBSClass(productStorage) {
      var storageAttribute = STORAGE_ATTRIBUTES[productStorage._id];
      if (!storageAttribute || !storageAttribute.bsClass) {
        return '';
      }
      return 'label-' + storageAttribute.bsClass;
    }

    function format(productStorages) {
      function transpose(productStorage) {
        return {
          id: productStorage._id,
          label: productStorage.label,
          bsClass: getBSClass(productStorage),
          description: productStorage.description
        };
      }

      return productStorages.map(transpose);
    }

    this.get = function() {
      var params = {
        ddoc: 'product-storages',
        view: 'product-storages',
        reduce: false,
        /*eslint-disable camelcase */
        include_docs: true
        /*eslint-enable camelcase */
      };
      return couchdb.view(params).$promise
        .then(couchUtil.pluckDocs)
        .then(format);
    };
  });
