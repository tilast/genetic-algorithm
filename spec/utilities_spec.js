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

      console.log(normalize(a));
      var result = normalize(a);
      
      expect(floatEquality(result[0], 0.2, 0.000000001)).eql(true);
      expect(floatEquality(result[1], 0.5, 0.000000001)).eql(true);
      expect(floatEquality(result[2], 0.3, 0.000000001)).eql(true);
    });

  });

});