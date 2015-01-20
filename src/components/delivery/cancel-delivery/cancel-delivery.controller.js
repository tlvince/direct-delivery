'use strict';

angular.module('delivery')
  .controller('CancelDeliveryCtrl', function CancelDeliveryCtrl($state, STATUS, deliveryService, log) {

    var vm = this; //view model
    vm.facilityName = $state.params.facilityName;
    vm.facilityId = $state.params.facilityId;

    vm.facRnd = {};

    function initCancelReport(){
      if(!vm.facRnd.cancelReport){
        //set with default
        vm.facRnd.cancelReport = deliveryService.getDefaultCancelReport();
      }
    }

    function onSuccess(){
      log.success('deliveryCancelled');
      $state.go('home');
    }

    function onError(err){
      log.error(saveFailed, err);
    }

    initCancelReport();

    vm.onReasonSelection = function(){
      if(vm.facRnd.cancelReport.cancelledAhead === true){
        //unset other reasons.
        vm.facRnd.cancelReport.others = false;
        vm.facRnd.cancelReport.hfNotAvailable = false;
        vm.facRnd.cancelReport.noCCE = false;
        vm.facRnd.cancelReport.brokenCCE = false;
      }
    };


    vm.cancel = function () {
      var isValid = deliveryService.validateCancelReport(vm.facRnd);
      if(isValid === true){
        vm.facRnd.status = (vm.facRnd.cancelReport.cancelledAhead === true)? STATUS.CANCELLED_AHEAD : STATUS.CANCELLED;
        deliveryService.save()
          .then(onSuccess)
          .catch(onError);
      }else{
        log.error('invalidCancelReport');
      }
    };

  });
