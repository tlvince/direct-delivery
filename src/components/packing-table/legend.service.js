'use strict';

angular.module('packingTable')
  .service('packingTableLegendService', function(dbService, pouchUtil, STORAGE_ATTRIBUTES) {
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
        reduce: false,
        /*eslint-disable camelcase */
        include_docs: true
        /*eslint-enable camelcase */
      };
      return dbService.getView('product-storages/product-storages', params)
        .then(pouchUtil.pluckDocs)
        .then(format);
    };
  });
