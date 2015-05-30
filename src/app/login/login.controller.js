'use strict';

angular.module('login')
  .controller('LoginCtrl', function($state, log, AuthService, loginService, coreService, hasCompleteDesignDocs) {

    function loggedIn(){
      if(hasCompleteDesignDocs !== true && AuthService.isLoggedIn === false){
        $state.go('loadingScreen');
      }else{
        $state.go('home.schedule');
      }
      return coreService.startSyncAfterLogin(AuthService.currentUser.name);
    }

    this.login = function(username, password) {
      loginService.login(username, password)
        .then(loggedIn)
        .catch(function(err) {
          if(err.status === 401){
            return log.error('unauthorizedUser');
          }
          return log.error('authInvalid');
        });
    };

  });
