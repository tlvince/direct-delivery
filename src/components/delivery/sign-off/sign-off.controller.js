'use strict';

angular.module('delivery')
  .controller('SignOffCtrl', function FacilityDeliveryCtrl($state, $scope, STATUS, signOffService, log, deliveryService, dailyDelivery) {

    var vm = this; //view model
    var parent = $scope.facDevCtrl;
    vm.facRnd = parent.facRnd;
    vm.dailyDelivery = dailyDelivery;
    vm.signature = signOffService.getDefaultSignature();

    vm.submit = function () {
      if(signOffService.isValidSignature(vm.signature)){
        vm.signature.signedAt = new Date().toJSON();
        signOffService.signOff(dailyDelivery, vm.facRnd, vm.signature)
          .then(deliveryService.saved)
          .catch(deliveryService.failed);
      }else{
        log.error('invalidSignature');
      }
    };

  });
