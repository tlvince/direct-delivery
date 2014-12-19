/**
 * Created by ehealthafrica on 12/18/14.
 */


describe('unit: scheduleCtrl', function(){
  beforeEach(module('schedules'));

  var ctrl, scope;
  console.log('100 miles and running');
  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    ctrl = $controller('schedulesCtrl', {
      $scope : scope
    });
  }));

  it('should not be undefined', function(){
    expect(scope).toBeUndefined();
  })
});
