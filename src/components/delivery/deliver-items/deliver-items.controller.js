'use strict';

angular.module('delivery')
  .controller('DeliverItemsCtrl', function DeliverItemsCtrl($state, deliveryService) {

    var vm = this;

    function init(){
      if($state.params.preview === 'true'){
        vm.previewDelivery = true;
      }
      clearValidationError();
    }

    function clearValidationError(){
      vm.validationErr = {};
    }

    init();

    vm.calcDeliverQty = function(pp){
      var res = deliveryService.calcQty(pp);
      pp.deliveredQty = res.deliveredQty;
      pp.returnedQty = res.returnedQty;
      vm.validateOnChange(pp);
    };

    vm.validateOnChange = function(pp){
      vm.validationErr[pp.productID] = deliveryService.validateItemQty(pp);
    };

    vm.togglePreview = function(){
      vm.previewDelivery = !vm.previewDelivery;
    };

    vm.preview = function(dItem){
      var res = deliveryService.validateDeliverItems(dItem);
      if(res === true){
        clearValidationError();
        vm.togglePreview();
      }else{
        vm.validationErr = res;
      }
    };

  });
