'use strict';

angular.module('packing.item')
  .service('packingItemService', function(couchdb, couchUtil) {
    function unpack(response) {
      var tally = {};

      // View key is a complex key composed of: ['id', 'sortIndex'[, 'productID']]]
      // We're only interested in products, so filter out the parent
      // DailyDelivery object
      function children(row) {
        return row.key.length === 3;
      }

      // Build up a simple productID -> sum(expectedQty) representation
      function transpose(row) {
        var productID = row.key[2];
        tally[productID] = row.value;
      }

      response.rows
        .filter(children)
        .forEach(transpose);

      return tally;
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
  });
