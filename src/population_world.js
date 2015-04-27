var Chromosome = require('./chromosome');
var Utils      = require('./utils');
var Drawer     = require('./drawer');

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
      stopCounterValue = 10,
      drawer = new Drawer();

  var density2Distribution = function(densities) {
    return densities.reduce(function(accumulator, current) { 
      accumulator.push(current + accumulator[accumulator.length - 1]);
      return accumulator;
    }, [0]);
  };

  var getIndexByBall = function(ball, distribution) {
    var index = -1;

    for(var i = 0; i < distribution.length - 1; ++i) {
      if(distribution[i] <= ball && ball < distribution[i + 1]) {
        index = i;
      }
    }

    return index;
  };

  var selectOne = function(cities, chromosomes2Distances, density) {
    var densities = density2Distribution(density(chromosomes2Distances.map(function(item) {
      return item.distance;
    })));

    return population[getIndexByBall(Math.random(), densities)];
  };

  var drawMap = function(chromosome) {
    drawer.draw(chromosome.chromosome, cities);
    document.getElementById('length').innerHTML = chromosome.distance;
    document.getElementById('path').innerHTML = chromosome.chromosome.getGenes().join('->');
  };

  var averagePopulationDistance = function(populationDistances) {
    return populationDistances.reduce(function(accumulator, current) {
      return accumulator + current;
    }, 0) / populationDistances.length;
  };

  for(var i = 0; i < populationSize; ++i) {
    population.push(new Chromosome({ random: true, size: cities.length }));
  }

  for(var i = 0; i < 1000; ++i) {
    console.log('iteration ' + i);
    var str = '';
    var chromosomes2Distances = population.map(function(chromosome) {
      try {
        var item =  {
          chromosome: chromosome,
          distance: Utils.getTotalDistance(chromosome, cities)
        };
      } catch (e) {
        debugger;
        return;
      }

      str += ' ' + chromosome.toString() + ' distance: ' + item.distance + '\n';

      return item;
    });

    console.log('average population distance', averagePopulationDistance(chromosomes2Distances.map(function(item) { return item.distance; })));

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

    nextPopulation = [];

    for(var j = 0; j < population.length; ++j) {
      var parent1 = selectOne(cities, chromosomes2Distances, Utils.brutforceMethodSelection),
          parent2 = selectOne(cities, chromosomes2Distances, Utils.brutforceMethodSelection);

      var newCreature = parent1.crossover(parent2, 2);
      
      newCreature.mutate();
      nextPopulation.push(newCreature);
    }

    population = nextPopulation;
    prevMinChromosome2Distance = currentMinChromosome2Distance;
  }

  drawMap(currentMinChromosome2Distance);
}

module.exports = PopulationWorld;