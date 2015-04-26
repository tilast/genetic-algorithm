var Gene      = require('./gene');
var Constants = require('./constants');
var Utils     = require('./utils');

function Chromosome(options) {
  var size = options.size,
      genes = [];

  var createHelperArray = function() {
    var helper = [];
    for(var i = 0; i < size; ++i) {
      helper.push(i);
    }

    return helper;
  };

  var getEncoded = function() {
    var encodedGenes = [];
    var helper = createHelperArray();

    for(var i = 0; i < size; ++i) {
      var indexToDelete = helper.indexOf(options.genes[i]);
      
      encodedGenes.push(new Gene({
        maxValue: helper.length - 1,
        value: indexToDelete
      }));

      helper.splice(indexToDelete, 1);
    }

    return encodedGenes;
  };

  if (options.directGenes) {
    genes = options.directGenes;
  } else if (options.random) {
    for(var i = size - 1; i >= 0; --i) {
      genes.push(new Gene({
        maxValue: i,
        random: true
      }));
    }
  } else {
    // helper = [0..size-1]
    genes = getEncoded();
  }

  var getSize = function() {
    return size;
  };

  var getGenes = function() {
    var result = [],
        helper = createHelperArray();

    for(var i = 0; i < size; ++i) {
      var indexToDelete = genes[i].getValue();
      result.push(helper[indexToDelete]);
      helper.splice(indexToDelete, 1);
    }

    return result;
  };

  var crossover = function(chromosome, pointsAmount) {
    if(Math.random() < Constants.CROSSOVER_PROBABILITY) {
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

  var mutate = function() {
    if (Math.random() < Constants.MUTATE_PROBABILITY) {
      var number = Math.round(Math.random() * (size - 1));

      genes[number].mutate();
    }
  };

  return {
    crossover: crossover,
    mutate: mutate,
    getSize: getSize,
    getGenes: getGenes,
    getEncoded: function() { return genes; },
    toString: function() {
      return getGenes().reduce(function(str, gene) {
        return str + gene.toString();
      }, '');
    }
  };

}

module.exports = Chromosome;