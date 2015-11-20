'use strict';

angular.module('packingTable')
  .service('packingTableService', function($q, $state, log, dbService, pouchUtil, AuthService, utility, scheduleService) {
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

    this.getDayPacking = function (driverID, date) {
      driverID = driverID || AuthService.currentUser.name;
      var deliveryDate = date || new Date();
      var key = driverID + '-' + utility.formatDate(deliveryDate);
      var promises = [
        scheduleService.getDaySchedule(driverID, deliveryDate),
        _this.getPacking('packing/by-driver-date', key)
      ];

      function getPackingList (response) {
        var packedProducts = pouchUtil.pluckDocs(response[1]);
        var packingList = {};
        var processed = processPacked(extractPackingList(response[0]), pouchUtil.pluckDocs(response[1]));
        if (packedProducts.length > 0 && processed.packingList.length > 0) {
          packingList = packedProducts[0];
          packingList.packingList = processed.packingList;
        } else if (processed.packingList.length > 0) {
          packingList.packingList = processed.packingList;
          packingList.date = utility.formatDate(deliveryDate);
          packingList.driverID = driverID;
          packingList.doc_type = 'packingList';
        }

        if (processed.changed && processed.packingList.length > 0) {
          return dbService.save(packingList);
        } else if (processed.packingList.length === 0) {
          return pouchUtil.rejectIfEmpty(processed.packingList);
        }
        return packingList;
      }

      return $q.all(promises)
        .then(getPackingList)
    };

    function extractPackingList (schedules) {
      var length = schedules.length;
      var packed = {};
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          var row = schedules[i];
          var packedProduct = row.packedProduct;
          for (var j = 0; j < packedProduct.length; j++) {
            var key = packedProduct[j].productID;
            if (packed.hasOwnProperty(key)) {
              packed[key].expectedQty += packedProduct[j].expectedQty;
            } else {
              packed[key] = {
                productID: packedProduct[j].productID,
                expectedQty: packedProduct[j].expectedQty,
                storageID: packedProduct[j].storageID
              };
            }
          }
        }
      }
      return packed;
    }

    function processPacked (packedFromDelivery, packingList) {
      function toList (object) {
        var list = [];
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            list.push(object[key]);
          }
        }
        return list;
      }

      var list = packingList[0] || {packingList: []};
      var diff = [];
      var i = list.packingList ? list.packingList.length : 0;
      while (i--) {
        var row = list.packingList[i];
        if (packedFromDelivery.hasOwnProperty(row.productID) && row.hasOwnProperty('packedQty')) {
          packedFromDelivery[row.productID].packedQty = row.packedQty;
        }
        if (packedFromDelivery.hasOwnProperty(row.productID) && row.expectedQty !== packedFromDelivery[row.productID].expectedQty) {
          diff.push(row.productID)
        }
      }
      packedFromDelivery = toList(packedFromDelivery);
      return {
        packingList: packedFromDelivery,
        changed: !(diff.length === 0 && packedFromDelivery.length === list.packingList.length)
      }
    }
  });
