/**
 * Created by ehealthafrica on 12/18/14.
 */


xdescribe('unit: scheduleService', function(){

  //beforeEach(module('ui.router'));
  beforeEach(module('scheduler'));

  var ctrl, scope;
  beforeEach(inject(function($rootScope, _scheduleService_){
    scope = $rootScope.$new();
    ctrl = $controller('schedulesCtrl', {
      $scope : scope
    });
  }));

  it('should not be undefined', function(){
    expect(scope).toBeDefined();
    expect(scope.currentSchedule).toBeDefined();
  });

});
