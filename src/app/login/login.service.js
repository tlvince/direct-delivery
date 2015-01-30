'use strict';

angular.module('login')
  .service('loginService', function($state, log, AuthService) {
    this.login = function(username, password) {
      function loggedIn() {
        log.success('authSuccess');
        $state.transitionTo('home');
      }

      function handleError(err) {
        log.error('loginError', err);
      }

      AuthService.login(username, password)
        .then(loggedIn)
        .catch(handleError);
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
