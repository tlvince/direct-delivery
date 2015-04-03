'use strict';

angular.module('kpi')
  .controller('FacilityKPICtrl', function (facilityKPIService, utility, scheduleService, AuthService) {

    var vm = this;

    var facilityKPI = {};
    vm.selectedDate = utility.extractDate(new Date());
    vm.facilityList = [];
    vm.loadFacilities();

    vm.facilityKPI = {
      "outreachSessions": 0,
      "notes": "",
      "antigensKPI": [
        {
          "productID": "BCG",
          "noImmuized": 0
        },
        {
          "productID": "Men-A",
          "noImmuized": 0
        },
        {
          "productID": "OPV",
          "noImmuized": 0
        }
      ]
    };

    function clearValidationError(){
      vm.kpiError = {
        outreach: false,
        antigensNoImmunized: {}
      };
    }

    vm.loadFacilities = function() {
      var driverId = AuthService.currentUser.name;

      function extractFacilityRoundInfo(dailyDelivery) {
        if (!angular.isArray(dailyDelivery.facilityRounds)) {
          return [];
        }
        vm.facilityList = dailyDelivery.facilityRounds
          .map(function (facRnd) {
            return { id: facRnd.facility.id, name: facRnd.facility.name };
          });
      }

      scheduleService.getDaySchedule(driverId, vm.selectedDate)
        .then(extractFacilityRoundInfo);
    };

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
