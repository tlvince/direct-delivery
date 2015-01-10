angular.module('delivery')
  .constant('DELIVERY_STEPS', {
    START: 1,
    DELIVER_ITEM: 2,
    COLLECT_KPI: 3,
    POST_ITEM_DELIVERY: 4,
    CHILD_FACILITY: 5,
    SIGN_OFF: 6
  });
