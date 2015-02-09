'use strict';

angular.module('delivery')
  .controller('CancelDeliveryCtrl', function CancelDeliveryCtrl($state, $scope, deliveryService, cancelDeliveryService,
                                                                log, dailyDelivery, DELIVERY_STATUS) {

    var vm = this; //view model
    vm.status = DELIVERY_STATUS;

    function initCancelReport() {
      vm.dailyDelivery = dailyDelivery;
      var parent = $scope.facDevCtrl;
      vm.facRnd = parent.facRnd;
      if(!angular.isObject(vm.facRnd)){
        goBack();
        return;
      }
      if (!vm.facRnd.cancelReport) {
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

    vm.cancel = function () {
      var isValid = cancelDeliveryService.validateCancelReport(vm.facRnd);
      if (isValid === true) {
        cancelDeliveryService.cancelDelivery(vm.dailyDelivery, vm.facRnd)
          .then(onSuccess)
          .catch(onError);
      } else {
        log.error('invalidCancelReport');
      }
    };

  });
