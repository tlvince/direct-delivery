'use strict';

angular.module('packingTable')
  .service('packingTableService', function($state, log, user, couchdb, couchUtil, utility) {
    this.get = function(dailyDeliveryID) {
      var params = {
        docID: dailyDeliveryID
      };
      return couchdb.get(params).$promise;
    };

    this.getToday = function() {
      var params = {
        ddoc: 'daily-deliveries',
        view: 'by-driver-date',
        reduce: false,
        /*eslint-disable camelcase */
        include_docs: true
        /*eslint-enable camelcase */
      };

      var key = [
        user.email,
        '-',
        utility.formatDate(new Date())
      ].join('');

      key = couchUtil.key(key);
      angular.extend(params, key);
      return couchdb.view(params).$promise
        .then(couchUtil.pluckDocs)
        .then(utility.first);
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
      $state.go($state.current.data.nextState);
    };

    this.saveFailed = function(reason) {
      log.error('saveFailed', reason);
    };
  });
