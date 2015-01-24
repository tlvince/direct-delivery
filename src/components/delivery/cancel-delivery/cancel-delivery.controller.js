'use strict';

angular.module('delivery')
  .controller('CancelDeliveryCtrl', function CancelDeliveryCtrl($state, deliveryService, cancelDeliveryService,
                                                                log, dailyDelivery) {

    var vm = this; //view model

    function initCancelReport() {
      vm.dailyDelivery = dailyDelivery;
      vm.facilityId = $state.params.facilityId;
      var isValidFacilityId = (angular.isString(vm.facilityId) && vm.facilityId !== '');
      if (!(angular.isObject(vm.dailyDelivery) && isValidFacilityId)) {
        goBack();
        return;
      }
      var res = deliveryService.filterByFacility(vm.dailyDelivery, vm.facilityId);
      if (res.length > 0) {
        vm.facRnd = res[0];
      } else {
        goBack();
        return;
      }
      if (!vm.facRnd.cancelReport) {
        //set with default
        vm.facRnd.cancelReport = cancelDeliveryService.getDefaultCancelReport();
      }
    }

    function goBack() {
      log.error('facilityRoundNotSet');
      $state.go('facilityDelivery.deliverItems', $state.params);
    }

    function onSuccess() {
      log.success('deliveryCancelled');
      $state.go('home');
    }

    function onError(err) {
      log.error(saveFailed, err);
    }

    initCancelReport();

    vm.onReasonSelection = function () {
      if (vm.facRnd.cancelReport.cancelledAhead === true) {
        //unset other reasons.
        vm.facRnd.cancelReport.others = false;
        vm.facRnd.cancelReport.hfNotAvailable = false;
        vm.facRnd.cancelReport.noCCE = false;
        vm.facRnd.cancelReport.brokenCCE = false;
      }
    };

    vm.cancel = function () {
      var isValid = cancelDeliveryService.validateCancelReport(vm.facRnd.cancelReport);
      if (isValid === true) {
        cancelDeliveryService.cancelDelivery(vm.dailyDelivery, vm.facRnd)
          .then(onSuccess)
          .catch(onError);
      } else {
        log.error('invalidCancelReport');
      }
    };

  });
