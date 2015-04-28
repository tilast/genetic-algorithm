var Chromosome = require('./chromosome');
var Utils      = require('./utils');
var Drawer     = require('./drawer');

function PopulationWorld(options) {
  this.stop = false;
  this.result = null;
  this.cities = options.cities;
  this.populationSize = options.populationSize;
  this.drawer = new Drawer();
}

PopulationWorld.prototype.reset = function() {
  this.population = [];
  this.nextPopulation = [];
  this.prevMinChromosome2Distance;
  this.prevMaxChromosome2Distance;
  this.currentMinChromosome2Distance;
  this.currentMaxChromosome2Distance;
  this.avg = 0;
  this.prevAvg = 0;
  this.counter = 0;
  this.STOP_COUNTER_VALUE = 20;
  this.topBarrier = 150;
  this.ITERATIONS_AMOUNT = 1500;
  this.log = [];
};

PopulationWorld.prototype.run = function() {
  this.reset();

  for(var i = 0; i < this.populationSize; ++i) {
    this.population.push(new Chromosome({ random: true, size: this.cities.length }));
  }

  var _this = this;

  var str = '';

  for(var i = 0; i < this.ITERATIONS_AMOUNT; ++i) {
    console.log('iteration ' + i);
    var str = '';
    var chromosomes2Distances = this.population.map(function(chromosome) {
      var item =  {
        chromosome: chromosome,
        distance: Utils.getTotalDistance(chromosome, _this.cities)
      };

      str += ' ' + chromosome.toString() + ' distance: ' + item.distance + '\n';

      return item;
    });

    if(this.avg - this.prevAvg > this.topBarrier) {
      ++this.counter;
    }

    if(this.counter > this.STOP_COUNTER_VALUE) {
      break;
    }

    this.prevAvg = this.avg;
    this.avg = this.averagePopulationDistance(chromosomes2Distances.map(function(item) { return item.distance; }));

    console.log('average population distance', this.averagePopulationDistance(chromosomes2Distances.map(function(item) { return item.distance; })));

    this.currentMinChromosome2Distance = chromosomes2Distances.reduce(function(previousCreature, nextCreature) {
      return previousCreature.distance < nextCreature.distance ? previousCreature : nextCreature;
    }, chromosomes2Distances[0]);

    this.currentMaxChromosome2Distance = chromosomes2Distances.reduce(function(previousCreature, nextCreature) {
      return previousCreature.distance > nextCreature.distance ? previousCreature : nextCreature;
    }, chromosomes2Distances[0]);

    if (!this.prevMinChromosome2Distance) {
      this.prevMinChromosome2Distance = this.currentMinChromosome2Distance;
      this.prevMaxChromosome2Distance = this.currentMaxChromosome2Distance;
    }

    // console.log('min', this.currentMinChromosome2Distance.distance, 'max', this.currentMaxChromosome2Distance.distance, 'counter', this.counter);
    
    // if (this.prevMinChromosome2Distance.distance < this.currentMinChromosome2Distance.distance) {
    //   console.log('plus counter', this.counter);
    //   // this.counter++;
    // }

    this.nextPopulation = [];

    for(var j = 0; j < this.population.length; ++j) {
      var parent1 = this.selectOne(chromosomes2Distances, Utils.sutulaMethodSelection),
          parent2 = this.selectOne(chromosomes2Distances, Utils.sutulaMethodSelection);

      var newCreature = parent1.crossover(parent2, 3);
      
      newCreature.mutate();
      this.nextPopulation.push(newCreature);
    }

    this.population = this.nextPopulation;
    this.prevMinChromosome2Distance = this.currentMinChromosome2Distance;
    this.prevMaxChromosome2Distance = this.currentMaxChromosome2Distance;

    if(i > 0 && i % 50 == 0) {
      this.log.push(this.currentMinChromosome2Distance.chromosome.getGenes().map(function(city) {
        return {
          x   : _this.cities[city].getCoords().getX(),
          y   : _this.cities[city].getCoords().getY(),
          name: _this.cities[city].getName() + '(' + city + ')'
        };
      }));
    }
  }

  for(var i = 0; i < this.log.length; ++i) {
    (function(i) {
      setTimeout(function() {
        _this.drawMap(_this.log[i]);
      }, 500 * (i+1));
    })(i);
  }
};

PopulationWorld.prototype.density2Distribution = function(densities) {
  return densities.reduce(function(accumulator, current) { 
    accumulator.push(current + accumulator[accumulator.length - 1]);
    return accumulator;
  }, [0]);
};

PopulationWorld.prototype.getIndexByBall = function(ball, distribution) {
  var index = -1;

  for(var i = 0; i < distribution.length - 1; ++i) {
    if(distribution[i] <= ball && ball < distribution[i + 1]) {
      index = i;
    }
  }

  return index;
};

PopulationWorld.prototype.selectOne = function(chromosomes2Distances, density) {
  var distributions = this.density2Distribution(density(chromosomes2Distances.map(function(item) {
    return item.distance;
  })));

  return this.population[this.getIndexByBall(Math.random(), distributions)];
};

PopulationWorld.prototype.drawMap = function(cities) {
  this.drawer.draw(cities);
  // document.getElementById('length').innerHTML = chromosome.distance;
  // document.getElementById('path').innerHTML = chromosome.chromosome.getGenes().join('->');
};

PopulationWorld.prototype.averagePopulationDistance = function(populationDistances) {
  return populationDistances.reduce(function(accumulator, current) {
    return accumulator + current;
  }, 0) / populationDistances.length;
};

module.exports = PopulationWorld;