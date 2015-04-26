Array.prototype.sorted = function() {
  var newArray = this.slice(0, this.length);

  newArray.sort(function(a, b) {
    return a - b;
  });

  return newArray;
};

Number.prototype.times = function() {
  return Array.apply(null, {length: this}).map(Number.call, Number);
};

var normalize = function normalize(array) {
  var koef = 1 / (array.reduce(function(prev, curr) {
    return prev + curr;
  }, 0));

  return array.map(function(item) {
    return item * koef;
  });
};

var floatEquality = function floatEquality(num1, num2, precision) {
  return Math.abs(num1 - num2) < precision;
}

var brutforceMethodSelection = function brutforceMethodSelection(distances) {
  return normalize(distances
                    .sorted()
                    .map(function(distance) {
                      return 1 / distance;
                    }));
}

var getTotalDistance = function getTotalDistance(chromosome, cities) {
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


module.exports = {
  normalize: normalize,
  floatEquality: floatEquality,
  brutforceMethodSelection: brutforceMethodSelection,
  getTotalDistance: getTotalDistance,
  fitness: fitness
};