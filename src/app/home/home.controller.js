'use strict';

angular.module('home')
  .controller('HomeCtrl', function (dailySchedule, coreService, AuthService, SYNC_STATUS, $rootScope, $scope, HOME_TABS, $window) {
    var vm = this;
    var unbind = {};
    vm.today = new Date();
    vm.dailyDelivery = {};
    vm.tabs = HOME_TABS;
    vm.syncInProgress = coreService.getSyncInProgress();

    function processEvent(event, data) {
      vm.syncInProgress = coreService.getSyncInProgress();
    }

    function addSyncListeners() {
      unbind[SYNC_STATUS.IN_PROGRESS] = $rootScope.$on(SYNC_STATUS.IN_PROGRESS, processEvent);
      unbind[SYNC_STATUS.COMPLETE] = $rootScope.$on(SYNC_STATUS.COMPLETE, processEvent);
    }

    function init() {
      vm.dailyDelivery = dailySchedule;
      if (Object.keys(unbind).length === 0) {
        addSyncListeners();
        //add device online status listerners
        $window.addEventListener('offline', function (evt) {

          vm.syncErr = {
            state: evt.type === 'offline',
            msg: "device is offline, syncing will continue once there is internet connection"
          };

          $scope.$digest();
        });

        $window.addEventListener('online', function (evt) {
          
          vm.syncErr = {
            state: evt.type === 'online',
            msg: ""
          };

          $scope.$digest();
        });
      }
    }

    init();

    vm.isOnline = function () {
      return $window.navigator.onLine;
    };

    function removeSyncListeners() {
      for (var k in SYNC_STATUS) {
        var event = SYNC_STATUS[k];
        unbind[event]();
      }
      $window.addEventListener('offline', null);
      $window.addEventListener('online', null);
    }

    vm.startSync = function () {
      coreService.startSyncAfterLogin(AuthService.currentUser.name);
      addSyncListeners();
    };

    $scope.$on('$destroy', removeSyncListeners);

  });
