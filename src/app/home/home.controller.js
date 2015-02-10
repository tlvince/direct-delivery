'use strict';

angular.module('home')
  .controller('HomeCtrl', function(dailySchedule, coreService, AuthService, SYNC_STATUS, $rootScope, $scope, HOME_TABS, $state) {
    var vm = this;
    var unbind = {};
    vm.dailyDelivery = {};
    vm.tabs = HOME_TABS;
    vm.syncInProgress = coreService.getSyncInProgress();

    function processEvent(event, data){
      vm.syncInProgress = coreService.getSyncInProgress();
    }

    function addSyncListeners(){
      unbind[SYNC_STATUS.IN_PROGRESS] = $rootScope.$on(SYNC_STATUS.IN_PROGRESS, processEvent);
      unbind[SYNC_STATUS.COMPLETE] = $rootScope.$on(SYNC_STATUS.COMPLETE, processEvent);
    }

    function init(){
      vm.dailyDelivery = dailySchedule;
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
