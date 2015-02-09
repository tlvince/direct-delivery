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

    _this.validateCancelReport = function (dd) {
      return (dd.status &&
        ((dd.status === DELIVERY_STATUS.CANCELED_CCE) ||
        (dd.status === DELIVERY_STATUS.FAILED_CCE) ||
        (dd.status === DELIVERY_STATUS.CANCELED_OTHER) ||
        (dd.status === DELIVERY_STATUS.FAILED_OTHER) ||
        (dd.status === DELIVERY_STATUS.CANCELED_STAFF) ||
        (dd.status === DELIVERY_STATUS.FAILED_STAFF)));
    };

    _this.cancelDelivery  = function(dd, facRnd){
      facRnd.cancelReport.canceledOn = new Date().toJSON();
      var doc = angular.copy(deliveryService.updateFacilityRound(dd, facRnd));
      return deliveryService.save(doc);
    };

  });
