'use strict';

angular.module('login')
  .config(function($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      parent: 'index',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
    })
    .state('logout', {
      url: '/logout',
      resolve: {
        logout: function(loginService, log) {
          function handleLogoutError(msg){
            return log.warn('failedServerLogout', msg);
          }
          return loginService.logout()
            .catch(handleLogoutError);
        }
      }
    });
  });
