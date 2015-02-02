'use strict';

/**
 * @name syncService
 * @desc synchronization service between local and remote database.
 */
angular.module('sync')
  .service('syncService',
    function ($rootScope, pouchdbService, SYNC_DELIVERY_RND, SYNC_DAILY_DELIVERY, CORE_SYNC_DOWN, utility) {

      var _this = this;

      _this.replicateByFilter = function(toDB, fromDB, filterName, params){
        var db = pouchdbService.create(toDB);
        var options = {
          filter: filterName,
          query_params: params
        };
        return db.replicate.from(fromDB, options);
      };

      _this.replicateByIds = function(toDB, fromDB, docIds){
        var db = pouchdbService.create(toDB);
        var options = {
          doc_ids: docIds
        };
        return db.replicate.from(fromDB, options);
      };


      _this.dailyByDriver = function (local, dbUrl, driverName, date) {
        date = utility.formatDate(date);
        var filter = 'daily-deliveries/by_driver_and_date';
        var params =  {
          date: date,
          driverId: driverName
        };
        var rep = _this.replicateByFilter(local, dbUrl, filter, params);
        rep.on('complete', function (res) {
            $rootScope.$emit(SYNC_DAILY_DELIVERY.COMPLETE, {msg: res});
          })
          .on('error', function (err) {
            $rootScope.$emit(SYNC_DAILY_DELIVERY.ERROR, {msg: err});
          })
          .on('denied', function (err) {
            $rootScope.$emit(SYNC_DAILY_DELIVERY.DENIED, {msg: err});
          });
        return rep;
      };

      _this.deliveryRndWithinDate = function (local, dbUrl, date) {
        date =  utility.formatDate(date);
        var filter = 'delivery-rounds/within_date';
        var params = {
          date: date
        };
        var rep = _this.replicateByFilter(local, dbUrl, filter, params);
        rep.on('complete', function (res) {
            $rootScope.$emit(SYNC_DELIVERY_RND.COMPLETE, {msg: res});
          })
          .on('error', function (err) {
            $rootScope.$emit(SYNC_DELIVERY_RND.ERROR, {msg: err});
          })
          .on('denied', function (err) {
            $rootScope.$emit(SYNC_DELIVERY_RND.DENIED, {msg: err});
          });
        return rep;
      };

      _this.dailySyncDown = function (local, dbUrl, driverName, date) {
        var drListeners = {};
        date = utility.formatDate(date);

        var removeListeners = function () {
          for (var unbind in drListeners) {
            drListeners[unbind]();
          }
        };

        var syncDownDailyDelivery = function () {
          _this.dailyByDriver(local, dbUrl, driverName, date);
          removeListeners();
        };

        //attach and remove  listeners accordingly
        drListeners[SYNC_DELIVERY_RND.COMPLETE] = $rootScope.$on(SYNC_DELIVERY_RND.COMPLETE, syncDownDailyDelivery);
        drListeners[SYNC_DELIVERY_RND.ERROR] = $rootScope.$on(SYNC_DELIVERY_RND.ERROR, removeListeners);
        drListeners[SYNC_DELIVERY_RND.DENIED] = $rootScope.$on(SYNC_DELIVERY_RND.DENIED, removeListeners);

        //start daily sync down
        _this.deliveryRndWithinDate(local, dbUrl, date);
      };

      _this.replicateByDocTypes = function (local, dbUrl, docTypes) {
        var filter = 'docs/by_doc_types';
        var params = {
          docTypes: JSON.stringify(docTypes)
        };
        return _this.replicateByFilter(local, dbUrl, filter, params);
      };

    });
