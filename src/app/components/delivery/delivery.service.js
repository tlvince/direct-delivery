'use strict';

angular.module('delivery')
  .service('deliveryService', function (dbService, log, $state, DELIVERY_STATUS, utility, DELIVERY_FIELDS) {

    var _this = this;

    _this.initArrivalTime = function(doc, arrivalTime) {
      if(!utility.isValidDate(doc.arrivedAt)) {
        doc.arrivedAt = new Date(arrivalTime).toJSON();
      }
      return doc;
    };

    _this.save = function (ddDoc) {
      return dbService.save(ddDoc);
    };

    _this.get = function(id) {
      return dbService.get(id);
    };

    /**
     * This tests String equality after casting both items to strings.
     *
     * WARNING: equalString("null", null) and equalString("undefined", undefined)
     * will return True, which might not be what you are expecting.
     *
     * NOTE: this was required because sometimes when i pass facility id
     * via $stateParams they are casted to string and some facility id when pulled
     * from Google Sheet are not string hence mismatch when '===' is used for equality test.
     *
     * @param itemOne
     * @param itemTwo
     * @returns {boolean}
     */
    _this.equalString = function(itemOne, itemTwo){
      var itemStr= itemOne + '';
      var itemTwoStr = itemTwo + '';
      return itemStr === itemTwoStr;
    };

    _this.updateFacilityRound = function (dailyDelivery, facRnd) {

      return reGroupRoundDoc(dailyDelivery, facRnd);
    };

    function reGroupRoundDoc(dailyDelivery, target) {
      var grouped = createGroupSource(target);
      grouped.facilityRounds = [];
      var idCount = 0;
      var i = dailyDelivery.length;

      while (i--) {
        if (dailyDelivery[i]._id === target._id) {
          idCount ++;
        }

        if (dailyDelivery[i].facility.id === target.facility.id) {
          grouped.facilityRounds.push(createFacilityRounds(target));
        } else {
          grouped.facilityRounds.push(createFacilityRounds(dailyDelivery[i]));
        }
      }

      grouped.facilityRounds.sort(function (a, b) {
        return a.drop - b.drop;
      });

      return idCount > 1 ? grouped : target;
    }

    function createGroupSource(targetObject) {
      var destination = {};

      var i = DELIVERY_FIELDS.length;
      while (i--) {
        if (targetObject.hasOwnProperty(DELIVERY_FIELDS[i])) {
          destination[DELIVERY_FIELDS[i]] = targetObject[DELIVERY_FIELDS[i]];
        }
      }
      return destination;
    }

    function createFacilityRounds(row) {
      var destination = {};
      var i = DELIVERY_FIELDS.length;
      for (var key in row) {
        if (row.hasOwnProperty(key) && DELIVERY_FIELDS.indexOf(key) === -1 ) {
          destination[key] = row[key];
        }
      }
      return destination;
    }


    _this.filterByFacility = function (dd, facilityId) {
      return dd
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
      if(angular.isString(status)){
        status = status.toLowerCase();
      }
      if((status === DELIVERY_STATUS.CANCELED_CCE.toLowerCase()) ||
        (status === DELIVERY_STATUS.CANCELED_OTHER.toLowerCase()) ||
        (status === DELIVERY_STATUS.CANCELED_STAFF.toLowerCase())) {
          return ccsClass === 'alert-warning';
      }else if((status === DELIVERY_STATUS.FAILED_CCE.toLowerCase()) ||
        (status === DELIVERY_STATUS.FAILED_OTHER.toLowerCase()) ||
        (status === DELIVERY_STATUS.FAILED_STAFF.toLowerCase())) {
          return ccsClass === 'alert-danger';
      }else if((status === DELIVERY_STATUS.SUCCESS_FIRST.toLowerCase()) ||
        (status === DELIVERY_STATUS.SUCCESS_SECOND.toLowerCase())){

          return ccsClass === 'alert-success';
      }else{
        return false;
      }
    };

    _this.isDelivered = function (deliveryRound) {
      if (!deliveryRound.facilityRounds) {
        return false;
      }

      // Treat deliveries with any of these statuses as delivered
      var deliveredStatuses = [
        DELIVERY_STATUS.SUCCESS_FIRST,
        DELIVERY_STATUS.SUCCESS_SECOND,
        DELIVERY_STATUS.CANCELED_CCE,
        DELIVERY_STATUS.CANCELED_OTHER,
        DELIVERY_STATUS.CANCELED_STAFF,
        DELIVERY_STATUS.FAILED_CCE,
        DELIVERY_STATUS.FAILED_STAFF,
        DELIVERY_STATUS.FAILED_OTHER
      ];

      function isDelivered(facilityRound) {
        return deliveredStatuses.indexOf(facilityRound.status) !== -1;
      }

      return deliveryRound.facilityRounds.every(isDelivered);
    };
  });
