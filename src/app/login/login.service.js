'use strict';

angular.module('login')
  .service('loginService', function($state, log, AuthService) {

    this.login = function(username, password) {
      return AuthService.login(username, password);
    };

    this.logout = function() {
      function login() {
        return $state.go('login');
      }

      function handleError(err) {
        log.warn('failedServerLogout', msg);
        return $state.go('login');
      }

      return AuthService.logout()
        .then(login)
        .catch(handleError);
    };
  });
