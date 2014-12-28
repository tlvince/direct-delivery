'use strict';

angular.module('directDelivery', [
    'core',
    'navbar',
    'footer',
    'home',
    'auth',
    'log',
    'login',
    'scheduler',
    'packing',
    'packing.all',
    'packing.item'
  ])
  .run(function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!AuthService.currentUser() && toState.name !== 'login') {
        $state.transitionTo('login');
        event.preventDefault();
      }
    });
  });
