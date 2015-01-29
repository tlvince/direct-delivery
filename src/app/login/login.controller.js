'use strict';

angular.module('login')
  .controller('LoginCtrl', function($state, log, AuthService, coreService, hasCompleteDesignDocs) {

    this.login = function(username, password) {
      AuthService.login(username, password)
        .then(function() {
          log.success('authSuccess');
          if(hasCompleteDesignDocs !== true){
            $state.go('loadingScreen');
          }else{
            $state.go('home');
          }
          coreService.startSyncAfterLogin('abdullahi.ahmed@example.com');
        })
        .catch(function(err) {
          log.error(err);
        });
    };

  });
