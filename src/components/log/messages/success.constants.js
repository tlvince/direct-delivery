'use strict';

angular.module('log')
  .constant('SUCCESS_MESSAGES', {
    packingSaved: {
      title: 'Packing saved',
      message: 'Packing list saved successfully'
    },
    authSuccess: {
      title: 'Authentication',
      message: 'Login success'
    },
    'deliveryCancelled': {
      title: 'Delivery cancelled',
      message: 'Delivery cancelled successfully'
    },
    'facilityDeliverySaved': {
      title: 'Delivery report saved',
      message: 'Facility delivery report completed successfully'
    },
    'dailyDeliverySyncDown': {
      title: 'Daily delivery sync down',
      message: 'Daily delivery sync down completed successfully'
    }
  });
