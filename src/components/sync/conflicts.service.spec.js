'use strict';
/* global beforeEach, inject, module, it, expect, describe, spyOn */

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
          resolveConflicts: resolveConflictsFun || angular.noop
        };
      }
    };
  }

  it('should not try to listen for changes twice', function() {
    var mock = dbMockFactory();
    spyOn(mock, 'create').and.callThrough();

    module(function($provide) {
      $provide.value('pouchdbService', mock);
    });

    inject(function(conflictsService) {
      conflictsService.maybeListenForConflicts();
      conflictsService.maybeListenForConflicts();
      expect(mock.create.calls.count()).toEqual(1);
    });
  });

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

  it('should abort if modifiedOn is missing', function() {
    var actual;

    function resolveConflicts(doc, resolveFun) {
      doc = {
        /*eslint-disable camelcase */
        doc_type: 'dailyDelivery'
        /*eslint-enable camelcase */
      };
      actual = resolveFun(doc, doc);
    }

    module(function($provide) {
      $provide.value('pouchdbService', dbMockFactory(resolveConflicts));
    });

    inject(function(conflictsService) {
      conflictsService.maybeListenForConflicts();
      expect(actual).toBe(null);
    });
  });
});
