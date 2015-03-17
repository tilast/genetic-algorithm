var CROSSOVER_PROBABILITY       = 1;
var MUTATE_PROBABILITY          = 1;
var MINIMUM_FITNESS_PROBABILITY = 0;

function Gene(options) {
  var maxValue = options.maxValue,
      value;

  var mutate = function() {
    value = Math.round(Math.random() * maxValue);
  };

  var getValue = function() {
    return value;
  };

  if(options.random) {
    mutate();
  } else {
    value = options.value;
  }

  if(isNaN(+value)) {
    throw new Error('Value is not a number');
  }

  if(isNaN(+maxValue)) {
    throw new Error('maxValue is not a number');
  }

  if(value > maxValue) {
    throw new Error('value is bigger than maxValue');
  }

  return {
    mutate: mutate,
    getValue: getValue,
    getMax: function() {
      return maxValue;
    },
    toString: function() {
      return value + ' ';
      // return ['value', value, 'max value', maxValue].join(' ');
    }
  };
}

function Chromosome(options) {
  var size = options.size,
      genes = [];

  var createHelper = function() {
    var helper = [];
    for(var i = 0; i < size; ++i) {
      helper.push(i);
    }

    return helper;
  };

  var getEncoded = function() {
    var encodedGenes = [];
    var helper = createHelper();

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
        helper = createHelper();

    for(var i = 0; i < size; ++i) {
      var indexToDelete = genes[i].getValue();
      result.push(helper[indexToDelete]);
      helper.splice(indexToDelete, 1);
    }

    return result;
  };

  var crossover = function(chromosome, pointsAmount) {
    if(Math.random() < CROSSOVER_PROBABILITY) {
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
    }
  };

  var mutate = function() {
    if (Math.random() < MUTATE_PROBABILITY) {
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
  }
}

function Point(options) {
  var _x = options.x,
      _y = options.y;

  return {
    getX: function() {
      return _x;
    },
    getY: function() {
      return _y;
    }
  };
};

function City(options) {
  var _name   = options.name,
      _coords = options.coords;

  return {
    calculateDistanceTo: function(city) {
      return Math.sqrt( Math.pow((city.getCoords().getX() - _coords.getX()), 2) + Math.pow((city.getCoords().getY() - _coords.getY()), 2) );
    },
    getName: function() {
      return _name;
    },
    getCoords: function() {
      return _coords;
    }
  };
}

var getTotalDistance = function(chromosome, cities) {
  var genes = chromosome.getGenes(),
      totalDistanceLength = 0;

  for(var i = 0; i < chromosome.getSize(); ++i) {
    try {
      totalDistanceLength += cities[genes[i]].calculateDistanceTo(cities[(genes[(i + 1) % cities.length])]);
    } catch(e) {
      console.log(genes);
      throw e;
    }
  }

  return totalDistanceLength;
};

var fitness = function fitness(chromosome, cities) {
  return getTotalDistance(chromosome, cities);
};

function PopulationWorld(options) {
  var stop = false,
      result = null,
      cities = options.cities,
      populationSize = options.populationSize,
      population = [],
      nextPopulation = [],
      prevMinChromosome2Distance,
      currentMinChromosome2Distance,
      counter = 0,
      stopCounterValue = 10;

  var selectOne = function(cities, chromosomes2Distances) {
    var maxDistance = 0;

    var index = Math.round(Math.random() * (population.length - 1));

    return population[index];
  };

  var drawMap = function(chromosome) {
    console.log(chromosome);
  };

  for(var i = 0; i < populationSize; ++i) {
    population.push(new Chromosome({ random: true, size: cities.length }));
  }

  for(var i = 0; i < 100; ++i) {
    console.log('iteration ' + i);
    var str = '';
    var chromosomes2Distances = population.map(function(chromosome) {

      var item =  {
        chromosome: chromosome,
        distance: getTotalDistance(chromosome, cities)
      };

      str += ' ' + chromosome.toString() + ' distance: ' + item.distance + '\n';

      return item;
    });

    console.log(str);

    currentMinChromosome2Distance = chromosomes2Distances.reduce(function(previousCreature, nextCreature) {
      return previousCreature.distance < nextCreature.distance ? previousCreature : nextCreature;
    }, chromosomes2Distances[0]);

    if (!prevMinChromosome2Distance) {
      prevMinChromosome2Distance = currentMinChromosome2Distance;
    }

    console.log('prev', prevMinChromosome2Distance.distance, 'curre', currentMinChromosome2Distance.distance, 'counter', counter);
    
    if (prevMinChromosome2Distance.distance < currentMinChromosome2Distance.distance) {
      console.log('plus counter', counter);
      counter++;
    }

    if (counter > stopCounterValue) {
      break;
    }

    nextPopulation = [];

    for(var j = 0; j < population.length; ++j) {
      var parent1 = selectOne(cities, chromosomes2Distances),
          parent2 = selectOne(cities, chromosomes2Distances);

      var newCreature = parent1.crossover(parent2, 1);
      nextPopulation.push(newCreature);
    }

    population = nextPopulation;
    prevMinChromosome2Distance = currentMinChromosome2Distance;
  }

  drawMap(currentMinChromosome2Distance);
}

var cities = [];

// cities.push(new City( {name: "Los Angeles", coords: new Point({x: 0, y: 0})} ));
// cities.push(new City( {name: "Miami",  coords: new Point({x: 3, y: 0})} ));
// cities.push(new City( {name: "Seattle", coords: new Point({x: 0, y: 4})} ));

cities.push(new City( {name: "A", coords: new Point({x: -2, y: 0})} ));
cities.push(new City( {name: "B", coords: new Point({x: 0, y: 3})} ));
cities.push(new City( {name: "C", coords: new Point({x: 0, y: -1})} ));
cities.push(new City( {name: "D", coords: new Point({x: 4, y: -1})} ));
cities.push(new City( {name: "E", coords: new Point({x: 5, y: 1})} ));
cities.push(new City( {name: "F", coords: new Point({x: 1, y: 1})} ));
cities.push(new City( {name: "G", coords: new Point({x: 3, y: 2})} ));
cities.push(new City( {name: "H", coords: new Point({x: 14, y: -8})} ));
cities.push(new City( {name: "K", coords: new Point({x: -52, y: 18})} ));

// cities.push(new City( {name: "A", coords: new Point({x: 2, y: 2})} ));
// cities.push(new City( {name: "B", coords: new Point({x: 2, y: -2})} ));
// cities.push(new City( {name: "C", coords: new Point({x: -2, y: -2})} ));
// cities.push(new City( {name: "D", coords: new Point({x: -2, y: 2})} ));
// cities.push(new City( {name: "D", coords: new Point({x: 10, y: 7})} ));
// cities.push(new City( {name: "D", coords: new Point({x: -9, y: 12})} ));
// cities.push(new City( {name: "A", coords: new Point({x: 2, y: 2})} ));
// cities.push(new City( {name: "B", coords: new Point({x: 2, y: -2})} ));
// cities.push(new City( {name: "C", coords: new Point({x: -2, y: -2})} ));
// cities.push(new City( {name: "D", coords: new Point({x: -2, y: 2})} ));
// cities.push(new City( {name: "D", coords: new Point({x: 10, y: 7})} ));
// cities.push(new City( {name: "D", coords: new Point({x: -9, y: 12})} ));

// var genes = [0, 3, 1, 2, 4];

// var totalDistanceLength = 0;
// for(var i = 0; i < cities.length; ++i) {
//   totalDistanceLength += cities[genes[i]].calculateDistanceTo(cities[(genes[(i + 1) % cities.length])]);
// }

// console.log(totalDistanceLength);


var population = new PopulationWorld({
  cities: cities,
  populationSize: 40
});

// Жив був Круш. За 3.9 земель. І була в Круша 3 дочки-бочки. Перша дочка Свєта. 
// Вона цілувалась з жирними мужикамі, коли було лєто.
// Друга була Анджела. Вона цілувалась з усіма мужиками в СНГ.
// Третя була Валюха. Вона цілувалась з хачамі, а потім їх динамила.
// Але тут трапилось бєда... (мєрзость)
