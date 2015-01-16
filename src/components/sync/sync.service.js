'use strict';

/**
 * @name syncService
 * @desc synchronization service between local and remote database.
 */
angular.module('sync')
  .service('syncService', ['$rootScope', 'pouchdbService', 'SYNC_DELIVERY_RND', 'SYNC_DAILY_DELIVERY',
    function ($rootScope, pouchdbService, SYNC_DELIVERY_RND, SYNC_DAILY_DELIVERY) {

      var dailyByDriver = function (local, dbUrl, driverId, date) {
        date = new Date(date);
        var options = {
          filter: 'daily-deliveries/by_driver_and_date',
          query_params: {
            date: date.toJSON(),
            driverId: driverId
          }
        };
        var db = pouchdbService.create(local);
        return db
          .replicate.from(dbUrl, options)
          .on('complete', function (res) {
            $rootScope.$emit(SYNC_DAILY_DELIVERY.COMPLETE, {msg: res});
          })
          .on('error', function (err) {
            $rootScope.$emit(SYNC_DAILY_DELIVERY.ERROR, {msg: err});
          })
          .on('denied', function (err) {
            $rootScope.$emit(SYNC_DAILY_DELIVERY.DENIED, {msg: err});
          });
      };

      var deliveryRndWithinDate = function (local, dbUrl, date) {
        date = new Date(date);
        var dlRndRepOptions = {
          filter: 'delivery-rounds/within_date',
          query_params: {
            date: date.toJSON()
          }
        };

        var db = pouchdbService.create(local);
        return db
          .replicate.from(dbUrl, dlRndRepOptions)
          .on('complete', function (res) {
            $rootScope.$emit(SYNC_DELIVERY_RND.COMPLETE, {msg: res});
          })
          .on('error', function (err) {
            $rootScope.$emit(SYNC_DELIVERY_RND.ERROR, {msg: err});
          })
          .on('denied', function (err) {
            $rootScope.$emit(SYNC_DELIVERY_RND.DENIED, {msg: err});
          });
      };

      this.dailySyncDown = function (local, dbUrl, driverId, date) {
        date = new Date(date);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var handleCompleteSync = function () {
          dailyByDriver(local, dbUrl, driverId, date);
          drListeners[SYNC_DELIVERY_RND.COMPLETE]();
        };

        //attach listeners
        var drListeners = {};
        drListeners[SYNC_DELIVERY_RND.COMPLETE] = $rootScope.$on(SYNC_DELIVERY_RND.COMPLETE, handleCompleteSync);
        drListeners[SYNC_DELIVERY_RND.ERROR] = $rootScope.$on(SYNC_DELIVERY_RND.ERROR, drListeners[SYNC_DELIVERY_RND.ERROR]);
        drListeners[SYNC_DELIVERY_RND.DENIED] = $rootScope.$on(SYNC_DELIVERY_RND.DENIED, drListeners[SYNC_DELIVERY_RND.DENIED]);

        //start daily sync down
        deliveryRndWithinDate(local, dbUrl, date);
      };

    }]);
