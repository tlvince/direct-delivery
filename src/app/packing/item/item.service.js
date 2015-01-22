'use strict';

angular.module('packing.item')
  .service('packingItemService', function($state, log, couchdb) {
    this.get = function(dailyDeliveryID) {
      var params = {
        docID: dailyDeliveryID
      };
      return couchdb.get(params).$promise;
    };

    this.save = function(dailyDelivery) {
      function formatPackingList(packingList) {
        return {
          productID: packingList.productID,
          storageID: packingList.storageID,
          expectedQty: packingList.expectedQty,
          packedQty: packingList.packedQty
        };
      }

      function savePackedList(deliveryDoc) {
        deliveryDoc.packingList = dailyDelivery.packingList
          .map(formatPackingList);
        deliveryDoc.packed = true;
        deliveryDoc.packedDate = new Date().toJSON();
        return deliveryDoc.$update();
      }

      return this.get(dailyDelivery._id)
        .then(savePackedList);
    };

    this.saved = function() {
      log.success('packingSaved');
      $state.go('packing.all');
    };

    this.saveFailed = function(reason) {
      log.error('saveFailed', reason);
    };
  });
