'use strict';

angular.module('navbar')
  .controller('NavbarCtrl', function(navbarService, AuthService) {
    this.auth = AuthService;
    this.items = navbarService.get();
    this.isOpen = false;
    this.isCollapsed = true;
  });
