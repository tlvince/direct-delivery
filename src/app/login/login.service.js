'use strict';

angular.module('login')
  .service('loginService', function($state, AuthService) {
    this.logout = function() {
      function login() {
        $state.go('login');
      }

      AuthService.logout()
        .then(login);
    };
  });
