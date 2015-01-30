'use strict';

angular.module('delivery')
  .service('cancelDeliveryService', function (deliveryService, STATUS) {

    var _this = this;

    _this.getDefaultCancelReport = function () {
      var defaultCR = {
        cancelledAhead: false,
        others: false,
        hfNotAvailable: false,
        brokenCCE: false,
        noCCE: false,
        note: ''
      };
      return defaultCR;
    };

    _this.validateCancelReport = function (cr) {
      var noCRSelected = !(cr.cancelledAhead === true ||
        cr.hfNotAvailable === true || cr.brokenCCE === true || cr.noCCE === true ||
        cr.others === true);

      if (noCRSelected) {
        return false;
      }
      return true;
    };

    _this.cancelDelivery  = function(dd, facRnd){
      facRnd.status = (facRnd.cancelReport.cancelledAhead === true)? STATUS.CANCELLED_AHEAD : STATUS.CANCELLED;
      var doc = angular.copy(deliveryService.updateFacilityRound(dd, facRnd));
      return deliveryService.save(doc);
    };

  });
