'use strict';

/**
 * @name coreService
 * @desc core service for app setup, daily sync and other core features of the app.
 */
angular.module('core')
  .service('coreService', function ($rootScope, syncService, config, pouchdbService, CORE_SYNC_DOWN,
                                    SYNC_DAILY_DELIVERY, SYNC_DESIGN_DOC, $state, log, SYNC_STATUS,
                                    utility) {

    var _this = this;
    var isReplicationFromInProgress = false;

    function turnOffReplicateFromInProgress() {
      isReplicationFromInProgress = false;
      $rootScope.$emit(SYNC_STATUS.COMPLETE, { msg: isReplicationFromInProgress });
    }

    function turnOnReplicateFromInProgress(){
      isReplicationFromInProgress = true;
      $rootScope.$emit(SYNC_STATUS.IN_PROGRESS, { msg: isReplicationFromInProgress });
    }

    function replicateDailyDelivery(driverEmail, date) {
      syncService.dailySyncDown(config.localDB, config.db, driverEmail, date);
    }

    function replicateCoreDocTypes(driverEmail, date) {
      syncService.replicateByDocTypes(config.localDB, config.db, config.coreDocTypes)
        .on('complete', function (res) {
          $rootScope.$emit(CORE_SYNC_DOWN.COMPLETE, {msg: res});
          replicateDailyDelivery(driverEmail, date);
        })
        .on('error', function (err) {
          $rootScope.$emit(CORE_SYNC_DOWN.ERROR, {msg: err});
          replicateDailyDelivery(driverEmail, date);
        })
        .on('denied', function (err) {
          $rootScope.$emit(CORE_SYNC_DOWN.DENIED, {msg: err});
          replicateDailyDelivery(driverEmail, date);
        });
    }

    _this.getSyncInProgress = function(){
      return isReplicationFromInProgress;
    };

    /**
     * @desc This replicates documents from, remote db to local db.
     *
     * @param driverEmail
     * @param date
     */
    _this.replicateFromBy = function (driverEmail, date) {

      if (_this.getSyncInProgress() === true) {
        $rootScope.$emit(SYNC_STATUS.IN_PROGRESS, { msg: isReplicationFromInProgress });
        return;
      }

      turnOnReplicateFromInProgress();

      syncService.replicateByIds(config.localDB, config.db, config.designDocs)
        .on('complete', function (res) {
          $rootScope.$emit(SYNC_DESIGN_DOC.COMPLETE, { msg: res });
          replicateCoreDocTypes(driverEmail, date);
        })
        .on('error', function (err) {
          $rootScope.$emit(SYNC_DESIGN_DOC.ERROR, { msg: err });
          replicateCoreDocTypes(driverEmail, date);
        })
        .on('denied', function (err) {
          $rootScope.$emit(SYNC_DESIGN_DOC.DENIED, { msg: err });
          replicateCoreDocTypes(driverEmail, date);
        });
    };

    _this.hasCompleteDesignDocs = function () {
      function validateDesignDoc(res) {
        return res.rows.every(function(row) {
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

      function visitHome(){
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

    var getDefaultOptions = function(){
      var remoteUrl =config.db;
      var options = {
        url: remoteUrl, // remote Couch URL
        maxTimeout: 60000, // max retry timeout, defaulted to 300000
        startingTimeout: 1000, // retry timeout, defaulted to 1000
        backoff: 1.1, // exponential backoff factor, defaulted to 1.1
        manual: false, // when true, start replication with start()
        changes: { // options for changes()
          opts: {
            live: true
          }
        },
        // options for replicating to remote source
        to: {
          // replicate.to() options
          opts: {
            live: true
          },
          url: remoteUrl,
          onErr: function (err) {
            log.error('remoteReplicationErr', err);
          },
          listeners: [{
            method: 'once',
            event: 'uptodate',
            listener: function () {
              log.success('remoteReplicationUpToDate');
            }
          }]
        }
      };
      return options;
    };

    _this.replicateToRemote = function () {
      var options = getDefaultOptions();
      var docTypes = ['dailyDelivery'];
      options.to.opts.filter = 'docs/by_doc_types';
      options.to.opts.query_params = {
        docTypes: JSON.stringify(docTypes)
      };

      var replication = syncService.replicateToRemote(config.localDB, config.db, options);

      replication.on('connect', function(){});

      replication.on('disconnect', function (err) {
       log.error('remoteReplicationDisconnected', err);
      });

      replication.start();

      return replication;
    };

  });
