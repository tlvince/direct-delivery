'use strict';

/**
 * @name syncService
 * @desc synchronization service between local and remote database.
 */
angular.module('sync')
  .service('syncService',
    function ($rootScope, pouchdbService, SYNC_DELIVERY_RND, SYNC_DAILY_DELIVERY, CORE_SYNC_DOWN, utility) {

      //TODO check if sync is in progress for each and broadcast appropriate message.
      var dailyByDriver = function (local, dbUrl, driverId, date) {
        date = utility.formatDate(date);
        var options = {
          filter: 'daily-deliveries/by_driver_and_date',
          query_params: {
            date: date,
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
        date =  utility.formatDate(date);
        var options = {
          filter: 'delivery-rounds/within_date',
          query_params: {
            date: date
          }
        };
        var db = pouchdbService.create(local);
        return db
          .replicate.from(dbUrl, options)
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
        var drListeners = {};
        date = utility.formatDate(date);
        var removeListeners = function () {
          for (var unbind in drListeners) {
            drListeners[unbind]();
          }
        };

        var handleCompleteSync = function () {
          dailyByDriver(local, dbUrl, driverId, date);
          removeListeners();
        };

        //attach and remove  listeners accordingly
        drListeners[SYNC_DELIVERY_RND.COMPLETE] = $rootScope.$on(SYNC_DELIVERY_RND.COMPLETE, handleCompleteSync);
        drListeners[SYNC_DELIVERY_RND.ERROR] = $rootScope.$on(SYNC_DELIVERY_RND.ERROR, removeListeners);
        drListeners[SYNC_DELIVERY_RND.DENIED] = $rootScope.$on(SYNC_DELIVERY_RND.DENIED, removeListeners);

        //start daily sync down
        deliveryRndWithinDate(local, dbUrl, date);
      };

      this.coreSyncDown = function (local, dbUrl, docTypes) {
        var options = {
          filter: 'docs/by_doc_types',
          query_params: {
            docTypes: JSON.stringify(docTypes)
          }
        };
        var db = pouchdbService.create(local);
        return db
          .replicate.from(dbUrl, options)
          .on('complete', function (res) {
            $rootScope.$emit(CORE_SYNC_DOWN.COMPLETE, { msg: res });
          })
          .on('error', function (err) {
            $rootScope.$emit(CORE_SYNC_DOWN.ERROR, { msg: err });
          })
          .on('denied', function (err) {
            $rootScope.$emit(CORE_SYNC_DOWN.DENIED, { msg: err });
          });
      };

    });
