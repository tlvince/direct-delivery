'use strict';

function FacilityDeliveryCtrl($state, DELIVERY_STEPS){
  var vm = this; //view model
  vm.STEPS = DELIVERY_STEPS;
  vm.currentStep = vm.STEPS.START;
  vm.facilityName = $state.params.facilityName;
  vm.facilityId = $state.params.facilityId;

  if(!(angular.isString(vm.facilityName) && angular.isString(vm.facilityId))){
    //TODO: go back to previous page and show error alert.
  }

  vm.reason = {
    others: false,
    notAvailable: false,
    brokenCCE: false,
    noCCE: false,
    notes: ''
  };

  vm.cancelAndSubmitReport = function(){
    //TODO: validate, submit report and discontinue delivery.
    //navigate to home page with alert.
    console.log(vm);
  };

  vm.goTo = function(pos){
    vm.currentStep = pos;
  };

}

angular.module('delivery')
  .controller('FacilityDeliveryCtrl', FacilityDeliveryCtrl);
