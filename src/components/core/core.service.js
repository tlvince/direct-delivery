'use strict';

/**
 * @name coreService
 * @desc core service for app setup, daily sync and other core features of the app.
 */
angular.module('core')
  .service('coreService', function ($rootScope, syncService, config, pouchdbService, CORE_SYNC_DOWN,
                                    SYNC_DAILY_DELIVERY, SYNC_DESIGN_DOC, $state, log, SYNC_STATUS,
                                    utility, scheduleService, AuthService, $q, dbService) {

    var _this = this;
    var isReplicationFromInProgress = false;
    var replicationTo;
    var inRetry = false;

    function turnOffReplicateFromInProgress() {
      isReplicationFromInProgress = false;
      var dailySchedule;
      scheduleService.getDaySchedule()
        .then(function(res) {
          dailySchedule = res;
        })
        .finally(function() {
          var data = {msg: isReplicationFromInProgress, dailySchedule: dailySchedule};
          $rootScope.$emit(SYNC_STATUS.COMPLETE, data);
        });
    }

    function turnOnReplicateFromInProgress() {
      isReplicationFromInProgress = true;
      $rootScope.$emit(SYNC_STATUS.IN_PROGRESS, {msg: isReplicationFromInProgress});
    }

    function onFailSync(err, replicateDown, driverEmail) {
      //unauthorised due to network issues or wrong login details.
      turnOffReplicateFromInProgress();
      if (replicateDown) {
        replicateDown.cancel();
      }
      if (replicationTo) {
        replicationTo.cancel();
        replicationTo = false; //clear sync up
      }
      if (err.status === 401) {
        //broadcast event and show user instruction using information tab.
        _this.retryStartSyncAfterLogin(driverEmail)
          .finally(function() {
            var MAX_RETRY_COMPLETED = true;
            $rootScope.$emit(SYNC_STATUS.MAX_RETRY_COMPLETED, {
              msg: MAX_RETRY_COMPLETED
            });
          });
      } else {
        $rootScope.$emit(SYNC_STATUS.ERROR, {
          msg: err
        });
      }
    }

    function replicateDailyDelivery(driverEmail, date) {
      syncService.dailySyncDown(config.localDB, config.db, driverEmail, date);
    }

    function replicateCoreDocTypes(driverEmail, date) {
      var replicateDown = syncService.replicateByDocTypes(config.localDB, config.db, config.coreDocTypes)
        .on('complete', function (res) {
          $rootScope.$emit(CORE_SYNC_DOWN.COMPLETE, {msg: res});
          replicateDailyDelivery(driverEmail, date);
        })
        .on('error', function (err) {
          $rootScope.$emit(CORE_SYNC_DOWN.ERROR, {msg: err});
          onFailSync(err, replicateDown, driverEmail);
        })
        .on('denied', function (err) {
          $rootScope.$emit(CORE_SYNC_DOWN.DENIED, {msg: err});
          onFailSync(err, replicateDown, driverEmail);
        });
    }

    _this.getSyncInProgress = function () {
      return isReplicationFromInProgress;
    };

    _this.turnOffRetry = function() {
      inRetry = false;
    };

    _this.retryStartSyncAfterLogin = function(driverEmail, retry){
      if (inRetry) {
        $rootScope.$emit(SYNC_STATUS.IN_PROGRESS, {msg: isReplicationFromInProgress});
        return $q.reject('Retry after login still in progress');
      }

      inRetry = true;

      var currentRetry = retry || 0;
      var MAXIMUM_RETRY = 5;
      currentRetry = currentRetry + 1;

      return AuthService.login(driverEmail, AuthService.getTempPassword())
        .then(function(){
          _this.turnOffRetry();
          return _this.startSyncAfterLogin(driverEmail);
        })
        .catch(function(err){
          if (currentRetry > MAXIMUM_RETRY) {
            _this.turnOffRetry();
            return err;
          }
          return _this.retryStartSyncAfterLogin(driverEmail, currentRetry);
        });
    };

    /**
     * @desc This replicates documents from, remote db to local db.
     *
     * @param driverEmail
     * @param date
     */
    _this.replicateFromBy = function (driverEmail, date) {

      if (_this.getSyncInProgress() === true) {
        $rootScope.$emit(SYNC_STATUS.IN_PROGRESS, {
          msg: isReplicationFromInProgress
        });
        return;
      }

      turnOnReplicateFromInProgress();

      var replicateDown = syncService.replicateByIds(config.localDB, config.db, config.designDocs)
        .on('complete', function (res) {
          $rootScope.$emit(SYNC_DESIGN_DOC.COMPLETE, {msg: res});
          replicateCoreDocTypes(driverEmail, date);
        })
        .on('error', function (err) {
          onFailSync(err, replicateDown, driverEmail);
          $rootScope.$emit(SYNC_DESIGN_DOC.ERROR, {msg: err});
        })
        .on('denied', function (err) {
          onFailSync(err, replicateDown, driverEmail);
          $rootScope.$emit(SYNC_DESIGN_DOC.DENIED, {msg: err});
        });
    };

    _this.hasCompleteDesignDocs = function () {

      function validateDesignDoc(res) {
        return res.rows.every(function (row) {
          return !row.error && !row.deleted;
        });
      }

      return pouchdbService.getDesignDocs(config.localDB, config.designDocs)
        .then(validateDesignDoc)
        .catch(function () {
          return false;
        });
    };

    _this.startSyncAfterLogin = function (driverEmail) {
      var today = utility.formatDate(new Date());
      _this.addCompleteSyncListeners();
      _this.replicateFromBy(driverEmail, today);
    };

    _this.addCompleteSyncListeners = function () {
      var unbind = {};

      function visitHome() {
        if ($state.current.name === 'loadingScreen') {
          $state.go('home');
        }
      }

      unbind[SYNC_DESIGN_DOC.COMPLETE] = $rootScope.$on(SYNC_DESIGN_DOC.COMPLETE, function () {
        visitHome();
        unbind[SYNC_DESIGN_DOC.COMPLETE]();
      });

      unbind[SYNC_DESIGN_DOC.ERROR] = $rootScope.$on(SYNC_DESIGN_DOC.ERROR, function (err) {
        log.error('requiredDocsFailed', err);
        visitHome();
        unbind[SYNC_DESIGN_DOC.ERROR]();
      });

      unbind[SYNC_DAILY_DELIVERY.COMPLETE] = $rootScope.$on(SYNC_DAILY_DELIVERY.COMPLETE, function () {
        turnOffReplicateFromInProgress();
        log.success('dailyDeliverySyncDown');
        _this.replicateToRemote();
        unbind[SYNC_DAILY_DELIVERY.COMPLETE]();
      });

      unbind[SYNC_DAILY_DELIVERY.ERROR] = $rootScope.$on(SYNC_DAILY_DELIVERY.ERROR, function (scope, err) {
        turnOffReplicateFromInProgress();
        log.error('dailyDeliverySyncDown', err);
        _this.replicateToRemote();
        unbind[SYNC_DAILY_DELIVERY.ERROR]();
      });

      unbind[SYNC_DAILY_DELIVERY.DENIED] = $rootScope.$on(SYNC_DAILY_DELIVERY.DENIED, function (scope, err) {
        turnOffReplicateFromInProgress();
        log.error('dailyDeliverySyncDown', err);
        _this.replicateToRemote();
        unbind[SYNC_DAILY_DELIVERY.DENIED]();
      });
    };

    _this.replicateToRemote = function () {
      var docTypes = ['dailyDelivery', 'kpi'];
      var options = {
        live: true,
        filter: 'docs/by-doc-type-not-deleted',
        /*eslint-disable camelcase */
        query_params: {
        /*eslint-enable camelcase */
          docTypes: angular.toJson(docTypes)
        }
      };

      if (!replicationTo) {
        replicationTo = syncService.replicateToRemote(config.localDB, config.db, options);
        replicationTo
          .on('error', function (err) {
            onFailSync(err, replicationTo, AuthService.currentUser.name);
            log.error('remoteReplicationDisconnected', err);
          });
        replicationTo
          .on('denied', function (err) {
            log.error('remoteReplicationDisconnected', err);
            onFailSync(err, replicationTo, AuthService.currentUser.name);
          });
        replicationTo
          .on('paused', function () {
            log.success('remoteReplicationUpToDate');
          });
      }
      return replicationTo;
    };

    _this.purgeStaleDocuments = function() {
      var THIRTY_DAYS = 30;
      var ONE_YEAR = THIRTY_DAYS * 12;
      var today = new Date();
      var view = 'docs/by-date';

      var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ONE_YEAR);
      var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - THIRTY_DAYS);

      return dbService.deleteAfter(startDate, endDate, view);
    };

  });
