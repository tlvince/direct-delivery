'use strict';

angular.module('delivery')
  .controller('FacilityDeliveryCtrl', function FacilityDeliveryCtrl($state, log, DELIVERY_STEPS, deliveryService, dailyDelivery) {

    var vm = this; //view model

    function init(){
      vm.dailyDelivery = dailyDelivery;
      var facilityId = $state.params.facilityId;
      vm.facRnd = {};
      vm.STEPS = DELIVERY_STEPS;
      if(!angular.isObject(vm.dailyDelivery)){
        $state.go('home');
        log.error('invalidDailyDelivery');
        return;
      }
      vm.ddId = vm.dailyDelivery._id;
      var dailyFacRndForGivenId = deliveryService.filterByFacility(vm.dailyDelivery, facilityId);
      if(dailyFacRndForGivenId.length === 0){
        log.error('facilityRoundNotSet');
        $state.go('home');
      }
      vm.facRnd = dailyFacRndForGivenId[0];
      vm.facility = vm.facRnd.facility;
      vm.facilityKPI = vm.facRnd.facilityKPI;
    }

    init();

  });
