'use strict';

angular.module('login')
  .controller('LogoutCtrl', function(loginService) {
    return loginService.logout();
  });
