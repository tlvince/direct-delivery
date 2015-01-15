'use strict';

/**
 * @name syncService
 * @desc synchronization service between local and remote database.
 */
angular.module('sync')
  .service('syncService', ['$rootScope', 'pouchdbService', 'SYNC_DOWN',
    function ($rootScope, pouchdbService, SYNC_DOWN) {

      this.dailySyncDown = function (local, dbUrl, driverId, date) {
        //TODO: db authentication before starting login
        var db = pouchdbService.create(local);
        var remote = pouchdbService.remote(dbUrl);

        db.replicate.from(remote)
          .on('complete', function (info) {
            $rootScope.$emit(SYNC_DOWN.COMPLETE, info);
          })
          .on('error', function (err) {
            $rootScope.$emit(SYNC_DOWN.ERROR, err);
          })
          .on('denied', function (err) {
            $rootScope.$emit(SYNC_DOWN.DENIED, err);
          });
      };

    }]);
