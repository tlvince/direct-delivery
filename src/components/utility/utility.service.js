'use strict';

/**
 * @name utility
 * @desc for sharing common functions and service
 */
angular.module('utility')
  .service('utility', function($filter, config) {

    this.formatDate = function(date, format) {
      var dateFormat = format || config.dateFormat;
      return $filter('date')(new Date(date), dateFormat);
    };

    // Convenience helper for functional programming
    this.first = function(list) {
      return list[0];
    };
  });
