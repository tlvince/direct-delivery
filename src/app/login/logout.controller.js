'use strict';

angular.module('login')
  .controller('LogoutCtrl', function(loginService, $state, AuthService) {
    AuthService.logout();
    $state.go('login');
  });
