'use strict';

angular.module('delivery')
  .service('signOffService', function (deliveryService, STATUS) {

    var _this = this;

    _this.isValidSignature  = function(signature){
      //FIXME: find better signature verification technique e.g base64 the image data uri
      return ((signature.$isEmpty === false) && (signature.dataUrl.length > 0));
    };

    _this.signOff = function(dd, facRnd, signature){
      facRnd.status = STATUS.COMPLETE;
      facRnd.signature = signature;
      dd = deliveryService.updateFacilityRound(dd, facRnd);
      return deliveryService.save(dd);
    };

  });
