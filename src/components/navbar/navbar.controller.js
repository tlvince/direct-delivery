'use strict';

angular.module('navbar')
  .controller('NavbarCtrl', function(config, navbarService) {
    this.name = config.name;
    this.items = navbarService.get();
  });
