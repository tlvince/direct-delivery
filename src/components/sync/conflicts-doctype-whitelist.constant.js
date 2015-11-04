'use strict';

angular.module('sync')
  .constant('CONFLICTS_DOCTYPE_WHITELIST', [
    'dailyDelivery',
    'deliveryRound'
  ]);
