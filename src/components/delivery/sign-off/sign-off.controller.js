'use strict';

angular.module('delivery')
  .controller('SignOffCtrl', function FacilityDeliveryCtrl($state, $scope, signOffService, log, deliveryService, dailyDelivery) {
    var vm = this;
    var parent = $scope.facDevCtrl;
    vm.facRnd = parent.facRnd;
    vm.dailyDelivery = dailyDelivery;

    vm.accepted = false;
    vm.accept = function() {
      if (vm.signature.isEmpty()) {
        return log.error('invalidSignature');
      }

      if (vm.accepted) {
        vm.signature.clear();
      }

      vm.accepted = !vm.accepted;
    };

    vm.submit = function() {
      var dataURL = vm.signature.toDataURL();
      var valid = signOffService.isValidSignature(dataURL);

      if (!valid) {
        return log.error('invalidSignature');
      }

      signOffService.signOff(dailyDelivery, vm.facRnd, dataURL)
        .then(deliveryService.saved)
        .catch(deliveryService.failed);
    };
  });
