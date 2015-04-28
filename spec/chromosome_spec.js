var Chromosome = require('../src/chromosome');
var Gene       = require('../src/gene');

describe('Chromosome', function() {

  describe('creating', function() {
    it('creates random', function() {
      var chromosome = new Chromosome({
        random: true,
        size: 10
      });

      expect(chromosome.getSize()).to.equal(10);
      expect(chromosome.getGenes()).to.be.instanceof(Array);
    });

    it('creates with concrete gens', function() {
      var genes = [1, 0, 4, 3, 2, 6, 5, 8, 7, 9];

      var chromosome = new Chromosome({
        genes: genes,
        size: 10
      });

      expect(chromosome.getSize()).to.equal(10);
      expect(chromosome.getGenes()).to.be.instanceof(Array);
    });
  });

  it('returns correct encoded gens', function() {
    var genes = [1, 0, 4, 3, 2, 6, 5, 8, 7, 9];

    var chromosome = new Chromosome({
      genes: genes,
      size: 10
    });

    expect(chromosome.getSize()).to.equal(10);
    expect(chromosome.getGenes()).to.be.instanceof(Array);
    var values = [];

    chromosome.getEncoded().forEach(function(gene) {
      values.push(gene.getValue());
    });
    expect(values).eql([1,0,2,1,0,1,0,1,0,0]);
  });

  it('returns correct decoded genes', function() {
    var genes = [1, 0, 4, 3, 2, 6, 5, 8, 7, 9];

    var chromosome = new Chromosome({
      genes: genes,
      size: 10
    });

    expect(chromosome.getSize()).to.equal(10);
    expect(chromosome.getGenes()).to.be.instanceof(Array);
    expect(chromosome.getGenes()).eql(genes);
  });

  it('can crossover', function() {
    var chromosome1 = new Chromosome({
      random: true,
      size: 10
    });

    var chromosome2 = new Chromosome({
      random: true,
      size: 10
    });

    var newChromosome = chromosome1.crossover(chromosome2, 2);

    expect(newChromosome).to.be.exist;
    expect(newChromosome.getSize()).to.equal(10);
    expect(newChromosome.getGenes()).to.be.instanceof(Array);
  });

  it('can mutate', function() {
    return;
    var chromosome = new Chromosome({
      random: true,
      size: 10
    });

    chromosome = chromosome.mutate();

    expect(chromosome.getSize()).to.equal(10);
    expect(chromosome.getGenes()).to.be.instanceof(Array);
  });

});