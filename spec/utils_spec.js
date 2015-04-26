Utils = require('../src/utils');

describe('Utilities', function() {

  describe('Array.sorted', function() {

    it('sorts array', function() {
      var array = [10, 4, -8, 7];

      expect([-8, 4, 7, 10]).eql(array.sorted());
    });

    it('returns new array', function() {
      var array = [10, 4, -8, 7];

      expect(array).not.equal(array.sorted());
    });

  });

  describe('normalize function', function() {

    it('takes an array of numbers an returns array of normalized values', function() {
      var a = [2, 5, 3];

      var result = Utils.normalize(a);
      
      expect(Utils.floatEquality(result[0], 0.2, 0.000000001)).eql(true);
      expect(Utils.floatEquality(result[1], 0.5, 0.000000001)).eql(true);
      expect(Utils.floatEquality(result[2], 0.3, 0.000000001)).eql(true);
    });

  });

  describe('Number.prototype.times', function() {

    it('returns an array of sequence from 0 to Number - 1', function() {
      expect((3).times()).eql([0, 1, 2]);
    });

  });

});