'use strict';

angular.module('delivery')
  .controller('DeliverItemsCtrl', function DeliverItemsCtrl($state, deliveryService, $scope, log) {

    var vm = this;
    var parent = $scope.facDevCtrl;
    vm.dailyDelivery = parent.dailyDelivery;
    vm.facRnd = parent.facRnd;

    function init(){
      if($state.params.preview === 'true'){
        vm.previewDelivery = true;
      }
      clearValidationError();
      vm.facRnd.packedProduct = deliveryService.initReturnedQty(vm.facRnd.packedProduct);
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

    vm.submit = function(){
      var doc = deliveryService.updateFacilityRound(vm.dailyDelivery, vm.facRnd);
      deliveryService.save(doc)
        .then(deliveryService.saved)
        .catch(deliveryService.failed);
    };

    vm.shouldHideSignOff = function(){
      return deliveryService.shouldHideSignOff(vm.facRnd);
    };

    vm.preview = function(dItem){
      var res = deliveryService.validateDeliverItems(dItem);
      if(res === true){
        clearValidationError();
        vm.facRnd = deliveryService.initArrivalTime(parent.facRnd, parent.arrivedAt);
        var doc = deliveryService.updateFacilityRound(vm.dailyDelivery, vm.facRnd);
        deliveryService.save(doc)
          .finally(function(){
            vm.togglePreview();
          });
      }else{
        vm.validationErr = res;
      }
    };

    vm.receivedStockBtwDelivery = function(i){
      return vm.facRnd.packedProduct[i].receivedInterimStock === true;
    };

    vm.resetReceivedBtwDeliveryQty = function(i){
      if(!vm.receivedStockBtwDelivery(i)){
        vm.facRnd.packedProduct[i].btwDeliveryReceivedQty = '';
      }
    };

    function saveCurrentStateOfDailyDelivery(){
      var doc = deliveryService.updateFacilityRound(vm.dailyDelivery, vm.facRnd);
      deliveryService.save(doc)
        .then(function() {
          log.info('dailyDeliverySaved');
        })
        .catch(function(err) {
          log.warn('dailyDeliveryUpdateNotSaved', err);
        });
    }

    $scope.$on('$destroy', saveCurrentStateOfDailyDelivery);

  });
