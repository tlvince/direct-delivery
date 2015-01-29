'use strict';

angular.module('directDelivery')
  .controller('IndexCtrl', function($rootScope, log, $state, hasCompleteDesignDocs) {

    function stateChangeError(event) {
      log.error('stateChangeError', event);
    }

    $rootScope.$on('$stateChangeError', stateChangeError);

    function showLoadingScreen(){
      if(hasCompleteDesignDocs !== true){
        $state.go('loadingScreen');
      }
    }

    showLoadingScreen();

  });
