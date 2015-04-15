'use strict';

angular.module('kpi')
  .controller('FacilityKPICtrl', function (facilityKPIService, utility, scheduleService,
                                           AuthService, deliveryService, log) {

    var vm = this;
    var driverId = AuthService.currentUser.name;

    function setFacilityList(list) {
      vm.facilityList = list;
    }

    vm.loadFacilities = function(){
      facilityKPIService.loadFacilities(driverId, vm.selectedDate)
        .then(function(facilityList){
          setFacilityList(facilityList);
        })
        .catch(function() {
          setFacilityList([]);
        });
    };

    vm.loadFacilityKPI = function() {
      vm.selectedLoadKPI = true;
      vm.facilityKPI = facilityKPIService.getFacilityKPIFrom(vm.selectedFacilityId, vm.facilityList);
      vm.selectedFacility = facilityKPIService.getFromById(vm.selectedFacilityId, vm.facilityList);
    };

    vm.isValidKPI = function(){
      return facilityKPIService.isValidKPI(vm.facilityKPI);
    };

    function clearValidationError(){
      vm.kpiError = {
        outreach: false,
        antigensNoImmunized: {}
      };
    }

    function initialize() {
      vm.selectedLoadKPI = false;
      vm.previewKPI = false;
      vm.facilityKPI = null;
      vm.selectedFacilityId = null;
      vm.selectedDate = utility.extractDate(new Date());
      vm.loadFacilities();
      setFacilityList([]);
      clearValidationError();
    }

    initialize();

    vm.togglePreview = function(){
      vm.previewKPI = !vm.previewKPI;
    };

    vm.isValidOutreach = function(){
      vm.kpiError.outreach =  !facilityKPIService.isValidOutreach(vm.facilityKPI.outreachSessions);
    };

    vm.preview = function(){
      var res = facilityKPIService.isValidFacilityKPI(vm.facilityKPI);
      if(res === true){
        clearValidationError();
        vm.togglePreview();
      }else{
        vm.kpiError = res;
      }
    };

    vm.isInvalid = function(index){
      var antigen = vm.facilityKPI.antigensKPI[index];
      vm.kpiError.antigensNoImmunized[index] = !angular.isNumber(antigen.noImmunized);
    };

    vm.save = function() {
      deliveryService.get(vm.selectedFacility.dailyDeliveryId)
        .then(function(dailyDelivery) {
          var facilityRound = utility.first(deliveryService.filterByFacility(dailyDelivery, vm.selectedFacility.id));
          if(angular.isObject(facilityRound)){
            facilityRound. facilityKPI = vm.facilityKPI;
            var dd = deliveryService.updateFacilityRound(dailyDelivery, facilityRound);
            dailyDelivery.save(dd)
              .then(function() {

              })
              .catch(function() {
                log.error('Facility Round Not Found');
              });
          }else{
            log.error('Facility Round Not Found');
          }
        })
        .catch(function(err) {
          log.error(err);
        });
    };

  });
