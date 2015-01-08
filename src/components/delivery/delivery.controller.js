'use strict';

function FacilityDeliveryCtrl($state){
  var vm = this; //view model
  vm.currentStep = 1;//TODO: use constants, makes it more readable
  vm.facilityName = $state.params.facilityName;
  vm.facilityId = $state.params.facilityId;

  if(!(angular.isString(vm.facilityName) && angular.isString(vm.facilityId))){
    //TODO: go back to previous page and show error alert.
  }


  vm.discontinueForm = {
    others: false,
    notAvailable: false,
    brokenCCE: false,
    notes: ''
  };

  vm.skipAndSubmitReport = function(){
    //TODO: submit discontinue delivery report and
    //navigate to home page with alert.
    console.log(vm);
  };

  vm.showDeliveryProducts = function(){
    vm.currentStep = 2;
  };

}

angular.module('delivery')
  .controller('FacilityDeliveryCtrl', FacilityDeliveryCtrl);
