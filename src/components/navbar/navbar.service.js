'use strict';

angular.module('navbar')
  .service('navbarService', function($state) {
    this.get = function() {
      var states = $state.get();
      function hasLabel(state) {
        return !state.abstract && state.data && state.data.label;
      }
      function isParent(state) {
        return state.name.indexOf('.') === -1;
      }
      function transpose(state) {
        return {
          name: state.name,
          label: state.data.label
        };
      }
      return states
        .filter(hasLabel)
        .filter(isParent)
        .map(transpose);
    };
  });
