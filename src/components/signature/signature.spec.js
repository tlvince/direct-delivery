'use strict';

xdescribe('signPad', function () {

  var scope, html, signPadScope, signPad;

  beforeEach(module('signature'));
  beforeEach(module('components/signature/signature-pad.html'));

  beforeEach(inject(function () {
    scope = $rootScope.$new();
    html = '<sign-pad signature="facDevCtrl.signature"></sign-pad>';
    signPad = $compile(html)(scope);
    scope.$apply();
    //retrieve the signPad's isolated scope.
    signPadScope = signPad.scope().$$childHead;
  }));

  it('should have signature canvas', function () {
    expect(signPad.find('canvas').length).toBe(1);
  });

});
