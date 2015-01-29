'use strict';

angular.module('home')
  .controller('HomeCtrl', function(dailySchedule, coreService, SYNC_STATUS, $rootScope){
    var vm = this;
    vm.dailyDelivery= [];
    console.log('home controller');
    console.log($rootScope.syncInProgress);
    vm.syncInProgress = $rootScope.syncInProgress;
    if(angular.isArray(dailySchedule) && dailySchedule.length > 0){
      vm.dailyDelivery = dailySchedule[0]
    }

    var unbind = {};
    unbind[SYNC_STATUS.IN_PROGRESS] = $rootScope.$on(SYNC_STATUS.IN_PROGRESS, function(){
      console.log('am here');
      vm.syncInProgress = coreService.getSyncInProgress();
    });

    unbind[SYNC_STATUS.COMPLETE] = $rootScope.$on(SYNC_STATUS.COMPLETE, function(){
      console.log('am here 2');
      vm.syncInProgress = coreService.getSyncInProgress();
    });

  });
