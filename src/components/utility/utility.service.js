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

      /**
       * We use this because angular.isDate() returns True if given a date
       * that is invalid. e.g angular.isDate(undefined);
       * @param date
       * @returns {boolean}
       */
    this.isValidDate = function(date){
      return (date && date !== null && (new Date(date)).toString() !== 'Invalid Date');
    };

  });
