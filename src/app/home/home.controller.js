'use strict';

angular.module('home')
  .controller('HomeCtrl', function(dailySchedule, coreService, AuthService, SYNC_STATUS, $rootScope, $scope, HOME_TABS) {
    var vm = this;
    var unbind = {};
    vm.dailyDelivery = [];
    vm.tabs = HOME_TABS;
    vm.syncInProgress = coreService.getSyncInProgress();

    function addSyncListeners(){
      unbind[SYNC_STATUS.IN_PROGRESS] = $rootScope.$on(SYNC_STATUS.IN_PROGRESS, function() {
        vm.syncInProgress = coreService.getSyncInProgress();
      });

      unbind[SYNC_STATUS.COMPLETE] = $rootScope.$on(SYNC_STATUS.COMPLETE, function() {
        vm.syncInProgress = coreService.getSyncInProgress();
      });
    }

    function init(){
      if (angular.isArray(dailySchedule) && dailySchedule.length > 0) {
        vm.dailyDelivery = dailySchedule[0];
      }
      addSyncListeners();
    }

    init();

    function removeSyncListeners(){
      for (var k in SYNC_STATUS) {
        var event = SYNC_STATUS[k];
        unbind[event]();
      }
    }

    vm.startSync = function(){
      coreService.startSyncAfterLogin(AuthService.currentUser.name);
      addSyncListeners();
    };

    $scope.$on('$destroy', removeSyncListeners);

  });
