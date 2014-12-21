'use strict';

angular.module('packing.item')
  .service('packingItemService', function(couchdb, couchUtil, STORAGE_ATTRIBUTES) {
    function unpack(response) {
      var packingList = {};

      // View key is a complex key composed of: ['id', 'sortIndex'[, 'productID']]]
      // We're only interested in products, so filter out the parent
      // DailyDelivery object
      function children(row) {
        return row.key.length === 3;
      }

      function transpose(row) {
        var productID = row.key[2];
        packingList[productID] = {
          productID: productID,
          expectedQty: row.value
        };
      }

      response.rows
        .filter(children)
        .forEach(transpose);

      return packingList;
    }

    this.get = function(itemID) {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'delivery-packing-list',
        group: true
      };

      var join = couchUtil.join(itemID);

      angular.extend(params, join);
      return couchdb.view(params).$promise
        .then(unpack);
    };

    this.attachStorage = function(packingList) {
      function mapStorageAttributes(response) {
        function attachAttributes(row) {
          var productID = row.key;
          var productStorageID = row.value;
          if (!packingList[productID] || !STORAGE_ATTRIBUTES[productStorageID]) {
            return;
          }
          packingList[productID].storage = STORAGE_ATTRIBUTES[productStorageID];
        }
        response.rows.forEach(attachAttributes);
      }

      var productIDs = Object.keys(packingList);
      var params = {
        ddoc: 'products',
        view: 'product-storage',
        keys: JSON.stringify(productIDs)
      };
      return couchdb.view(params).$promise
        .then(mapStorageAttributes);
    };
  });
