'use strict';

angular.module('packingTable')
  .service('packingTableService', function($state, log, dbService, pouchUtil, AuthService, utility) {
    var _this = this;
    this.get = function(dailyDeliveryID) {
      return dbService.get(dailyDeliveryID);
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
        return dbService.update(deliveryDoc);
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

    _this.getPacking = function(view, key) {

      var params = {};
      if (angular.isString(key) || angular.isArray(key)) {
        params = pouchUtil.key(key);
      }
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView(view, params);
    };

    this.getDayPacking = function(driverID, date) {
      driverID = driverID || AuthService.currentUser.name;
      var deliveryDate = date || new Date();
      var key = driverID + '-' + utility.formatDate(deliveryDate);
      return _this.getPacking('packing/by-driver-date', key)
        .then(pouchUtil.pluckDocs)
        .then(pouchUtil.rejectIfEmpty)
        .then(utility.first);
    };
  });
