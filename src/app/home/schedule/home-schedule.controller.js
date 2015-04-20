'use strict';

angular.module('home.schedule')
  .controller('HomeScheduleCtrl', function (dailySchedule, deliveryService, $scope, $rootScope,
                                            SYNC_STATUS, DELIVERY_STATUS) {
    var vm = this;
    vm.day = dailySchedule;
    vm.STATUS = DELIVERY_STATUS;

    var removeListener = $rootScope.$on(SYNC_STATUS.COMPLETE, processEvent);

    function processEvent(event, data) {
      vm.day = data.dailySchedule;
    }

    vm.getColorCode = function(status, ccsClass) {
      return deliveryService.getStatusColor(status, ccsClass);
    };

    vm.showScheduleTable = function () {
      return (vm.day && angular.isArray(vm.day.facilityRounds) && vm.day.facilityRounds.length > 0);
    };

    $scope.$on('$destroy', removeListener);

  });
