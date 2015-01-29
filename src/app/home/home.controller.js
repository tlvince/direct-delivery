'use strict';

angular.module('home')
  .controller('HomeCtrl', function(dailySchedule, coreService, SYNC_STATUS, $rootScope, $scope){
    var vm = this;
    var unbind = {};
    vm.dailyDelivery= [];
    vm.syncInProgress =coreService.getSyncInProgress();

    function init(){
      if(angular.isArray(dailySchedule) && dailySchedule.length > 0){
        vm.dailyDelivery = dailySchedule[0]
      }
    }

    init();

    unbind[SYNC_STATUS.IN_PROGRESS] = $rootScope.$on(SYNC_STATUS.IN_PROGRESS, function(){
      vm.syncInProgress = coreService.getSyncInProgress();
    });

    unbind[SYNC_STATUS.COMPLETE] = $rootScope.$on(SYNC_STATUS.COMPLETE, function(){
      vm.syncInProgress = coreService.getSyncInProgress();
    });

    function removeListeners(){
      for(var k in SYNC_STATUS){
        var event = SYNC_STATUS[k];
        unbind[event]();
      }
    }

    $scope.$on('$destroy', removeListeners);

  });
