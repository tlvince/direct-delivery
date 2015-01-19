'use strict';

/**
 * angular directive for signature pad
 * Ported from https://github.com/marcorinck/ngSignaturePad
 */
angular
  .module('signature')
  .directive('signPad', ['$window', function ($window) {
    var signaturePad, canvas, scope, element, EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

    $window.addEventListener('resize', function () {
      scope.$apply(function () {
        var img = signaturePad.toDataURL();
        signaturePad.fromDataURL(img);
      });
    }, false);

    $window.addEventListener('orientationchange', function () {
      scope.$apply(function () {
        var img = signaturePad.toDataURL();
        signaturePad.fromDataURL(img);
      });
    }, false);

    return {
      restrict: 'AE',
      templateUrl: 'components/signature/signature-pad.html',
      controllerAs: 'sp',
      scope: {
        signature: '=signature'
      },
      controller: function () {
        var vm = this;

        vm.clear = function(){
          signaturePad.clear();
        };

        vm.accept = function(){
          if (!signaturePad.isEmpty()) {
            scope.signature.dataUrl = signaturePad.toDataURL();
            scope.signature.$isEmpty = false;
          } else {
            scope.signature.dataUrl = EMPTY_IMAGE;
            scope.signature.$isEmpty = true;
          }
        };
      },
      link: function($scope, $element){
        canvas = $element.find('canvas')[0];
        scope = $scope;
        element = $element;
        signaturePad = new $window.SignaturePad(canvas);
        if ($scope.signature && !$scope.signature.$isEmpty && $scope.signature.dataUrl) {
          signaturePad.fromDataURL($scope.signature.dataUrl);
        }

        $element.on('$destroy', function(){
          $window.removeEventListener('orientationchange');
          $window.removeEventListener('resize');
        });
      }
    };
  }]);
