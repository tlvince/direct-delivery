'use strict';

angular.module('login')
  .controller('LoginCtrl', function($state, log, AuthService, loginService, coreService, hasCompleteDesignDocs) {

    function loggedIn(){
      log.success('authSuccess');
      if(hasCompleteDesignDocs !== true){
        $state.go('loadingScreen');
      }else{
        $state.go('home');
      }
      coreService.startSyncAfterLogin(AuthService.currentUser.name);
    }

    this.login = function(username, password) {
      loginService.login(username, password)
        .then(loggedIn)
        .catch(function(err) {
          log.error(err);
        });
    };

  });
