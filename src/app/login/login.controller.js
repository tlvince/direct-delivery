'use strict';

angular.module('login')
  .controller('LoginCtrl', function(loginService) {
    this.login = loginService.login;
  });
