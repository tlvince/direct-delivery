'use strict';

angular.module('kpi')
  .controller('FacilityKPICtrl', function (facilityKPIService) {

    var vm = this;

    var facilityKPI = {};

    function clearValidationError(){
      vm.kpiError = {
        outreach: false,
        antigensNoImmunized: {}
      };
    }

    vm.togglePreview = function(){
      vm.previewKPI = !vm.previewKPI;
    };

    vm.isValidOutreach = function(){
      vm.kpiError.outreach =  !facilityKPIService.isValidOutreach(facilityKPI.outreachSessions);
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

    vm.validateNoImmunized = function(i){
      var antigen = facilityKPI.antigensKPI[i];
      vm.kpiError.antigensNoImmunized[antigen.productID] = !angular.isNumber(antigen.noImmunized);
    };

  });
