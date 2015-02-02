'use strict';

angular.module('login')
  .service('loginService', function($state, log, AuthService) {

    this.login = function(username, password) {
      return AuthService.login(username, password);
    };

    this.logout = function() {
      function login() {
        $state.go('login');
      }

      function handleError(err) {
        log.error('logoutError', err);
      }

      AuthService.logout()
        .then(login)
        .catch(handleError);
    };
  });
