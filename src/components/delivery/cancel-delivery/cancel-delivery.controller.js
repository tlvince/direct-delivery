'use strict';

angular.module('delivery')
  .controller('CancelDeliveryCtrl', function CancelDeliveryCtrl($state, $scope, deliveryService, cancelDeliveryService,
                                                                log, dailyDelivery, DELIVERY_STATUS) {
    var vm = this; //view model
    vm.status = DELIVERY_STATUS;
    var arrivalTime;

    function initCancelReport() {
      vm.dailyDelivery = dailyDelivery;
      var parent = $scope.facDevCtrl;
      arrivalTime = parent.arrivedAt;
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

    vm.isOthersAndInvalid = function(){
      return cancelDeliveryService.isOthers(vm.facRnd) && !cancelDeliveryService.isValidOthers(vm.facRnd);
    };

    vm.cancel = function () {
      if(vm.isOthersAndInvalid()){
        return log.error('enterOtherReasons');
      }
      if (cancelDeliveryService.validateCancelReport(vm.facRnd)){
        vm.facRnd = deliveryService.initArrivalTime(vm.facRnd, arrivalTime);
        cancelDeliveryService.cancelDelivery(vm.dailyDelivery, vm.facRnd)
          .then(onSuccess)
          .catch(onError);
      } else {
        log.error('invalidCancelReport');
      }
    };

    vm.isSelected = function(option){
      return (vm.facRnd && vm.facRnd.status === option);
    };

  });
