describe('Gene', function() {
  describe('creates successfully', function() {
    
    it('with random true', function() {
      var gene = new Gene({
        maxValue: 10,
        random: true
      });

      console.log(gene.getValue());

      expect(gene.getValue()).to.exist;
    });

    it('with concrete value', function() {
      var gene = new Gene({
        maxValue: 10,
        value: 4
      });

      expect(gene.getValue()).to.exist;
      expect(gene.getValue()).to.equal(4);
    });
  });

  describe('creating failed', function() {
    it('with value more than max value', function() {
      expect(function() {
        new Gene({
          maxValue: 10,
          value: 20
        });
      }).to.throw(Error);
    });

    it('with non-numeric maxValue', function() {
      expect(function() {
        new Gene({
          value: 10,
          maxValue: 'sfjkns'
        })
      }).to.throw(Error);
    });

    it('with non-numeric value', function() {
      expect(function() {
        new Gene({
          maxValue: 10,
          value: 'dskjfnsd'
        })
      }).to.throw(Error);
    });
  });

  it('correct returns string value', function() {
    var gene = new Gene({
      maxValue: 10,
      value: 4
    });

    expect(gene.toString()).to.be.equal('value 4 max value 10');
  });

  
});