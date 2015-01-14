'use strict';

angular.module('delivery')
  .controller('FacilityDeliveryCtrl', function FacilityDeliveryCtrl($state, $window, DELIVERY_STEPS) {
    var vm = this; //view model
    vm.STEPS = DELIVERY_STEPS;
    vm.currentStep = vm.STEPS.DELIVER_ITEM;
    vm.facilityName = $state.params.facilityName;
    vm.facilityId = $state.params.facilityId;
    vm.previewDelivery = false;
    vm.previewKPI = false;
    var signaturePad;

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

    vm.cancelDelivery = function () {
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

    var initSignaturePad = function(){
      var canvas = $window.document.querySelector("canvas");
      signaturePad = new SignaturePad(canvas);
    };

    vm.clearSignature = function(){
      if(signaturePad){
        signaturePad.clear();
      }
    };

    vm.goTo = function (pos) {
      vm.currentStep = pos;
      if(vm.currentStep === vm.STEPS.SIGN_OFF){
        initSignaturePad();
      }
      if(vm.currentStep === vm.STEPS.PREVIEW_DELIVERY){
        vm.previewDelivery = true;
      }else{
        vm.previewDelivery = false;
      }
      if(vm.currentStep === vm.STEPS.PREVIEW_KPI){
        vm.previewKPI = true;
      }else{
        vm.previewKPI = false;
      }
    };

  });
