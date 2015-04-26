var Gene      = require('./gene');
var Constants = require('./constants');
var Utils     = require('./utils');

function Chromosome(options) {
  this.size     = options.size;
  this.genes    = [];
  this.rawGenes = options.genes;

  if (options.directGenes) {
    this.genes = options.directGenes;
  } else if (options.random) {
    this.genes = this.size.times().reverse().map(function(i) {
      return new Gene({
        maxValue: i,
        random: true
      });
    });
  } else {
    this.genes = this.getEncoded();
  }
}

/**
* @return array from 0..(size-1)
*/
Chromosome.prototype.createHelperArray = function() {
  return (this.size).times();
};

Chromosome.prototype.getEncoded = function() {
  if(this.genes && this.genes.length > 0) return this.genes;

  var helper = this.createHelperArray();

  return this.size.times().map(function(i) {
    var indexToDelete = helper.indexOf(this.rawGenes[i]);
    helper.splice(indexToDelete, 1);

    return new Gene({
      maxValue: helper.length,
      value: indexToDelete
    });
  }, this);
};

Chromosome.prototype.getGenes = function() {
  var helper = this.createHelperArray();
  
  return this.size.times().map(function(i) {
    var indexToDelete = this.genes[i].getValue();

    var toReturn = helper[indexToDelete];
    helper.splice(indexToDelete, 1);

    return toReturn;
  }, this);
};

Chromosome.prototype.crossover = function(chromosome, pointsAmount) {
  if(Math.random() < Utils.CROSSOVER_PROBABILITY) {
    var maybeSeparators = [],
        separators = [];

    for(var i = 0; i < size - 1; ++i) {
      maybeSeparators.push(i);
    }

    for(var i = 0; i < pointsAmount; ++i) {
      var index = Math.round(Math.random() * (maybeSeparators.length - 1));
      separators.push(maybeSeparators[index]);
      maybeSeparators.splice(index, 1);
    }

    var newGenes = [],
        toggle   = Math.round(Math.random()),
        previousStartIndex = 0;

    separators.push(size);
    separators.sort();

    for(var i = 0; i < separators.length; ++i) {
      var part = (toggle ? genes : chromosome.getEncoded())
                  .slice(previousStartIndex, separators[i] + 1);

      for(var j = 0; j < part.length; ++j) {
        newGenes.push(new Gene({ value: part[j].getValue(), maxValue: part[j].getMax() }));
      }

      toggle = !toggle;
      previousStartIndex = separators[i] + 1;
    }
    
    return new Chromosome({
      directGenes: newGenes,
      size: newGenes.length
    });
  } else {
    return Math.random() > 0.5 ? new Chromosome({ size: this.getSize(), genes: this.getGenes() }) : new Chromosome({ size: chromosome.getSize(), genes: chromosome.getGenes() });
  }
};

Chromosome.prototype.mutate = function() {
  if (Math.random() < Utils.MUTATE_PROBABILITY) {
    var number = Math.round(Math.random() * (size - 1));

    this.genes[number].mutate();
  }
};

Chromosome.prototype.getSize = function() {
  return this.size;
};

Chromosome.prototype.string = function() {
  return this.getGenes().reduce(function(str, gene) {
    return str + gene.toString();
  }, '');
}

module.exports = Chromosome;