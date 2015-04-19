'use strict';

angular.module('delivery')
  .service('deliveryService', function (dbService, log, $state, DELIVERY_STATUS) {

    var _this = this;

    _this.save = function (ddDoc) {
      return dbService.save(ddDoc);
    };

    _this.equalString = function(itemOne, itemTwo){
      var itemStr= itemOne + '';
      var itemTwoStr = itemTwo + '';
      return itemStr === itemTwoStr;
    };

    _this.updateFacilityRound = function (dailyDelivery, facRnd) {
      var fr;
      for (var i in dailyDelivery.facilityRounds) {
        fr = dailyDelivery.facilityRounds[i];
        if (_this.equalString(fr.facility.id, facRnd.facility.id)) {
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
          return (facRnd.facility && _this.equalString(facilityId, facRnd.facility.id));
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
      var expectedQty = packedProduct.expectedQty;
      var onHandQty = packedProduct.onHandQty;
      var presentation = packedProduct.presentation;

      if(!angular.isNumber(expectedQty)){
        expectedQty = 0;
      }
      if(!angular.isNumber(onHandQty)){
        onHandQty = 0;
      }
      if(!angular.isNumber(presentation)){
        presentation = 1;
      }

      var deliveredQty = (expectedQty - onHandQty);
      var returnedQty = (onHandQty - expectedQty);
      res.deliveredQty = deliveredQty;
      res.returnedQty = 0;
      if (deliveredQty <= 0) {
        res.deliveredQty = 0;
        res.returnedQty = returnedQty;
      }else{
        res.deliveredQty =  _this.roundOffBy(deliveredQty, presentation);
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

    _this.shouldHideSignOff = function(facilityRnd){
      return ((facilityRnd.status === DELIVERY_STATUS.SUCCESS_FIRST) ||
        (facilityRnd.status === DELIVERY_STATUS.SUCCESS_SECOND));
    };

    _this.getStatusColor = function(status, ccsClass){
      console.log("Am here: "+status);
      if(angular.isString(status)){
        status = status.toLowerCase();
      }
      if((status === DELIVERY_STATUS.CANCELED_CCE.toLowerCase()) ||
        (status === DELIVERY_STATUS.CANCELED_OTHER.toLowerCase()) ||
        (status === DELIVERY_STATUS.CANCELED_STAFF.toLowerCase())) {
         console.log(ccsClass === 'alert-warning');
          return ccsClass === 'alert-warning';
      }else if((status === DELIVERY_STATUS.FAILED_CCE.toLowerCase()) ||
        (status === DELIVERY_STATUS.FAILED_OTHER.toLowerCase()) ||
        (status === DELIVERY_STATUS.FAILED_STAFF.toLowerCase())) {
        console.log(ccsClass === 'alert-danger');
          return ccsClass === 'alert-danger';
      }else if((status === DELIVERY_STATUS.SUCCESS_FIRST.toLowerCase()) ||
        (status === DELIVERY_STATUS.SUCCESS_FIRST.toLowerCase())){

          return ccsClass === 'alert-success';
      }else{
        return false;
      }
    };

  });
