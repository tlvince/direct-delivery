'use strict';

angular.module('directDelivery')
  .controller('IndexCtrl', function(
    $log,
    $state,
    $rootScope,
    log,
    hasCompleteDesignDocs
  ) {

    function stateChangeError(event, toState, toParams, fromState, fromParams, err) {
      log.error('stateChangeError', event);
      $log.error(err);
    }

    $rootScope.$on('$stateChangeError', stateChangeError);

    function showLoadingScreen(){
      if(hasCompleteDesignDocs !== true){
        $state.go('loadingScreen');
      }
    }

    showLoadingScreen();

  });
