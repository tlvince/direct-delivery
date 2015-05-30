'use strict';

angular.module('login')
  .service('loginService', function($state, log, AuthService) {

    this.login = function(username, password) {
      return AuthService.login(username, password);
    };

  });
