'use strict';
/* global beforeEach, inject, module, it, expect, describe */

describe('conflictsService', function () {
  beforeEach(module('sync'));

  function dbMockFactory(resolveConflictsFun) {
    var change = {
      doc: {
        _conflicts: [],
        /*eslint-disable camelcase */
        doc_type: 'mock'
        /*eslint-enable camelcase */
      }
    };

    function on(event, fun) {
      if (event === 'change') {
        fun(change);
      }
      return {
        on: on
      };
    }

    return {
      create: angular.noop,
      remote: function() {
        return {
          changes: function() {
            return {
              on: on
            };
          },
          resolveConflicts: resolveConflictsFun
        };
      }
    };
  }

  it('should return remote doc if not in whitelist', function() {
    var actual;

    function resolveConflicts(doc, resolveFun) {
      var leftDoc = {
        name: 'gil'
      };
      var rightDoc = {
      };
      actual = resolveFun(leftDoc, rightDoc);
    }

    module(function($provide) {
      $provide.value('pouchdbService', dbMockFactory(resolveConflicts));
    });

    inject(function(conflictsService) {
      conflictsService.maybeListenForConflicts();
      expect(actual.name).toBe('gil');
    });
  });
});
