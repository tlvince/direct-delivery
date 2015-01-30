'use strict';

angular.module('delivery')
  .controller('FacilityKPICtrl', function DeliverItemsCtrl($state, deliveryService, facilityKPIService, $scope) {

    var vm = this;
    var facilityKPI = $scope.facDevCtrl.facilityKPI;
    vm.skipFacilityKPI = false;

    function init(){
      if($state.params.preview === 'true'){
        vm.previewKPI = true;
      }
      if(!angular.isObject(facilityKPI)){
        //TODO: verify if Facility KPI can be optional and also skipped, etc.
        //#see item:
      }
      clearValidationError();
    }

    function clearValidationError(){
      vm.kpiError = {
        outreach: false,
        antigensNoImmunized: {}
      };
    }

    init();

    vm.togglePreview = function(){
      vm.previewKPI = !vm.previewKPI;
    };

    vm.isValidOutreach = function(){
      vm.kpiError.outreach =  !facilityKPIService.isValidOutreach(facilityKPI.outreachSessions);
    };

    vm.validateNoImmunized = function(i){
      var antigen = facilityKPI.antigensKPI[i];
      vm.kpiError.antigensNoImmunized[antigen.productID] = !angular.isNumber(antigen.noImmunized);
    };

    vm.preview = function(){
      var res = facilityKPIService.isValidFacilityKPI(facilityKPI);
      if(res === true){
        clearValidationError();
        vm.togglePreview();
      }else{
        vm.kpiError = res;
      }
    };

  });
