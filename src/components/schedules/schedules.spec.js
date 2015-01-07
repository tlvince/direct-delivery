/**
 * Created by ehealthafrica on 12/18/14.
 */


describe('unit: scheduleCtrl', function(){

  beforeEach(module('ui.router'));
  beforeEach(module('scheduler'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope){
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
