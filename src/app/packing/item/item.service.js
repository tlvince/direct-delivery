'use strict';

angular.module('packing.item')
  .service('packingItemService', function($state, log, couchdb, couchUtil, STORAGE_ATTRIBUTES) {
    // Response is the result of a "join" where:
    //
    // * First row contains a daily delivery document
    // * Subsequent rows are packing lists
    // * Each row's key is composed of:
    //
    //     ['id', 'sortIndex', ('_rev'|'productID')]
    //
    //   ... where:
    //
    //   * `id`: dailyDelivery._id
    //   * `sortIndex`: 0 - daily delivery doc, 1 - packing list
    //   * `_rev|productID`: dailyDelivery._rev or packingList product
    //
    // * Packing list values are an aggregate of expected product quantities
    function unpack(response) {
      var dailyDelivery = {
        packingList: {}
      };

      function transpose(row) {
        var productID = row.key[2];
        dailyDelivery.packingList[productID] = {
          productID: productID,
          expectedQty: row.value
        };
      }

      var delivery = response.rows.shift();
      dailyDelivery.id = delivery.key[0];
      dailyDelivery.rev = delivery.key[2];

      response.rows.forEach(transpose);

      return dailyDelivery;
    }

    this.get = function(dailyDeliveryID) {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'delivery-packing-list',
        group: true
      };

      var join = couchUtil.join(dailyDeliveryID);

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

    this.save = function(dailyDelivery) {
      var params = {
        docID: dailyDelivery.id
      };

      function formatPackingList(productID) {
        var packingList = dailyDelivery.packingList[productID];
        return {
          productID: productID,
          packedQty: packingList.packedQty
        };
      }

      function savePackedList(deliveryDoc) {
        deliveryDoc.packedList = Object.keys(dailyDelivery.packingList)
          .map(formatPackingList);
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
