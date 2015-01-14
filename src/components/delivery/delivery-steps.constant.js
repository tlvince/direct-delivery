angular.module('delivery')
  .constant('DELIVERY_STEPS', {
    DELIVER_ITEM: 1,
    PREVIEW_DELIVERY: 2,
    COLLECT_KPI: 3,
    PREVIEW_KPI: 4,
    CHILD_FACILITY: 5,
    FINISH_CHILD_FACILITY: 6,
    SIGN_OFF: 7,
    CANCEL_DELIVERY: 8
  });
