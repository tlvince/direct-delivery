'use strict';

angular.module('delivery')
  .service('cancelDeliveryService', function (deliveryService, DELIVERY_STATUS) {

    var _this = this;

    _this.getDefaultCancelReport = function () {
      var defaultCR = {
        canceledOn: '',
        note: ''
      };
      return defaultCR;
    };

    _this.isOthers = function(facRnd){
      return (facRnd.status === DELIVERY_STATUS.CANCELED_OTHER ||
        facRnd.status === DELIVERY_STATUS.FAILED_OTHER);
    };

    _this.isValidOthers = function(facRnd){
      return _this.isOthers(facRnd) && facRnd.cancelReport.note !== '';
    };

    _this.validateCancelReport = function (facRnd) {
      if(_this.isOthers(facRnd)){
        return _this.isValidOthers(facRnd);
      }
      return (facRnd.status &&
        ((facRnd.status === DELIVERY_STATUS.CANCELED_CCE) ||
        (facRnd.status === DELIVERY_STATUS.FAILED_CCE) ||
        (facRnd.status === DELIVERY_STATUS.CANCELED_STAFF) ||
        (facRnd.status === DELIVERY_STATUS.FAILED_STAFF)));
    };

    _this.cancelDelivery  = function(dd, facRnd){
      facRnd.cancelReport.canceledOn = new Date().toJSON();
      var doc = angular.copy(deliveryService.updateFacilityRound(dd, facRnd));
      return deliveryService.save(doc);
    };

  });
