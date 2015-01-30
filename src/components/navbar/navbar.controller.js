'use strict';

angular.module('navbar')
  .controller('NavbarCtrl', function($state, config, navbarService, AuthService) {
    this.auth = AuthService;
    this.name = config.name;
    this.items = navbarService.get();
  });
