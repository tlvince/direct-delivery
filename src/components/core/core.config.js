'use strict';

angular.module('core')
  .config(function(ehaGoogleAnalyticsProvider, config) {
    ehaGoogleAnalyticsProvider.trackingID = config.trackingID;
  });
