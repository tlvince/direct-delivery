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
      var params = {
        /*eslint-disable no-underscore-dangle */
        docID: dailyDelivery._id
        /*eslint-enable no-underscore-dangle */
      };

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
        return deliveryDoc.$update(params).$promise;
      }

      return couchdb.get(params).$promise
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
