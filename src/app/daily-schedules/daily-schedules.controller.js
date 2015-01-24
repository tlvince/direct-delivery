/**
 * Created by ehealthafrica on 1/13/15.
 */

angular.module('schedules.daily')
  .controller('SchedulesDailyCtrl', function($state, dailySchedule){
    var vm = this;
    vm.dailyDelivery= dailySchedule[0];

    vm.deliver = function(facilityId){
      var params = {
        ddId : vm.dailyDelivery._id,
        facilityId: facilityId
      };
      $state.go('facilityDelivery.deliverItems', params);
    };

  });
