'use strict';

angular.module('delivery')
  .controller('FacilityDeliveryCtrl', function FacilityDeliveryCtrl($state, DELIVERY_STEPS) {
    var vm = this; //view model
    vm.STEPS = DELIVERY_STEPS;
    vm.currentStep = vm.STEPS.START;
    vm.facilityName = $state.params.facilityName;
    vm.facilityId = $state.params.facilityId;

    if (!(angular.isString(vm.facilityName) && angular.isString(vm.facilityId))) {
      //TODO: go back to previous page and show error alert.
    }

    vm.reason = {
      others: false,
      notAvailable: false,
      brokenCCE: false,
      noCCE: false,
      notes: ''
    };

    vm.cancelAndSubmitReport = function () {
      //TODO: validate, submit report and discontinue delivery.
      //navigate to home page with alert.
    };

    vm.signOffAndSubmit = function () {
      //TODO: capture signature, attach, validate and submit complete delivery report.
    };

    vm.anotherChildFacility = function(){
      //TODO: validate child facility
      //add to list, clear form
    };

    vm.goTo = function (pos) {
      vm.currentStep = pos;
    };

  });
