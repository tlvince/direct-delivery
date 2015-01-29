'use strict';

angular.module('loadingScreen')
  .controller('LoadingScreenCtrl', function($state, hasCompleteDesignDocs) {
    if(hasCompleteDesignDocs === true){
      $state.go('home');
    }
  });
