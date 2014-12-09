'use strict';

angular.module('directDelivery')
  .controller('IndexCtrl', function($rootScope, log) {
    function stateChangeError(event) {
      log.error('stateChangeError', event);
    }
    $rootScope.$on('$stateChangeError', stateChangeError);
  });
