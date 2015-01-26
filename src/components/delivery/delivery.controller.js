'use strict';

angular.module('delivery')
  .controller('FacilityDeliveryCtrl', function FacilityDeliveryCtrl($state, DELIVERY_STEPS, deliveryService, dailyDelivery) {

    var vm = this; //view model

    function init(){
      vm.dailyDelivery = dailyDelivery;
      var facilityId = $state.params.facilityId;
      vm.facRnd = {};
      vm.signature = {};
      vm.STEPS = DELIVERY_STEPS;
      vm.currentStep = vm.STEPS.DELIVER_ITEM;
      vm.previewKPI = false;
      var res = deliveryService.filterByFacility(vm.dailyDelivery, facilityId);
      if(res.length > 0){
        vm.facRnd = res[0];
      }else{
       //TODO: do something here.
        //probably go back to home and log.error();
        console.log('Facility Round does not exist.');
        return;
      }
      vm.ddId = vm.dailyDelivery._id;
      vm.facility = vm.facRnd.facility;
      vm.facilityKPI = vm.facRnd.facilityKPI;
      vm.facRnd = deliveryService.initReturnedQty(vm.facRnd);
    }

    init();


    vm.goTo = function (pos) {
      vm.currentStep = pos;
    };

  });
