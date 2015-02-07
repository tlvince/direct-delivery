'use strict';

angular.module('delivery')
  .service('deliveryService', function (dbService, log, $state, DELIVERY_STATUS) {

    var _this = this;

    _this.save = function (ddDoc) {
      return dbService.save(ddDoc);
    };

    _this.updateFacilityRound = function (dailyDelivery, facRnd) {
      var fr;
      for (var i in dailyDelivery.facilityRounds) {
        fr = dailyDelivery.facilityRounds[i];
        if (fr.facility.id === facRnd.facility.id) {
          dailyDelivery.facilityRounds[i] = facRnd;
          return dailyDelivery;
        }
      }
      dailyDelivery.facilityRounds.push(facRnd);
      return dailyDelivery;
    };

    _this.filterByFacility = function (dd, facilityId) {
      return dd.facilityRounds
        .filter(function (facRnd) {
          return facRnd.facility.id === facilityId;
        });
    };

    _this.roundOffBy = function(qty, presentation){
      var remainder = qty % presentation;
      if(remainder === 0){
        return qty;
      }
      return ((qty - remainder) + presentation);
    };

    _this.calcQty = function (packedProduct) {
      var res = {};
      var deliveredQty = (packedProduct.expectedQty - packedProduct.onHandQty);
      var returnedQty = (packedProduct.onHandQty - packedProduct.expectedQty);
      res.deliveredQty = deliveredQty;
      res.returnedQty = 0;
      if (deliveredQty <= 0) {
        res.deliveredQty = 0;
        res.returnedQty = returnedQty;
      }else{
        res.deliveredQty =  _this.roundOffBy(deliveredQty, packedProduct.presentation);
      }
      return res;
    };

    _this.initReturnedQty = function (packedProduct) {
      for (var i in packedProduct) {
        if (!angular.isNumber(packedProduct[i].returnedQty)) {
          packedProduct[i].returnedQty = 0;
        }
      }
      return packedProduct;
    };

    _this.validateItemQty = function (item) {
      var validation = {
        onHandQty: !angular.isNumber(item.onHandQty),
        expectedQty: !angular.isNumber(item.expectedQty),
        deliveredQty: !angular.isNumber(item.deliveredQty),
        returnedQty: !angular.isNumber(item.returnedQty)
      };
      return validation;
    };

    _this.validateDeliverItems = function(deliverItems){
      var invalid = {};
      function validate(item){
        var res =  _this.validateItemQty(item);
        for(var type in res){
          var invalidQty = res[type];
          if(invalidQty === true){
            invalid[item.productID] = res;
            break;
          }
        }
      }
      deliverItems.forEach(validate)
      var isValid = Object.keys(invalid).length === 0;
      if(isValid){
        return isValid;
      }
      return invalid;
    };

    _this.saved  = function(res){
      log.success('facilityDeliverySaved', res);
      $state.go('home');
    };

    _this.failed = function(err){
      log.error('dailyDeliveryFailed', err);
    };

    _this.setSuccessStatus = function(facRnd){
      if(facRnd.status === DELIVERY_STATUS.UPCOMING_SECOND) {
        facRnd.status = DELIVERY_STATUS.SUCCESS_SECOND;
      }else{
        facRnd.status = DELIVERY_STATUS.SUCCESS_FIRST;
      }
      return facRnd;
    };

  });
