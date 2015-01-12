'use strict';

angular.module('packing.item')
  .service('packingItemLegendService', function(couchdb, couchUtil, STORAGE_ATTRIBUTES) {
    function getBSClass(productStorageID) {
      var rowToLabelMap = {
        active: 'default'
      };

      var attr = STORAGE_ATTRIBUTES[productStorageID];
      if (!attr) {
        return '';
      }

      var bsClass = attr.bsClass;
      if (bsClass in rowToLabelMap) {
        bsClass = rowToLabelMap[bsClass];
      }

      return 'label-' + bsClass;
    }

    function format(productStorages) {
      function transpose(productStorage) {
        return {
          id: productStorage._id,
          label: productStorage.label,
          bsClass: getBSClass(productStorage._id),
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
