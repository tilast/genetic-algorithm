Array.prototype.sorted = function(comparator) {
  var newArray = this.slice(0, this.length);

  newArray.sort(comparator ? comparator : function(a, b) {
    return a - b;
  });

  return newArray;
};

Number.prototype.times = function() {
  return Array.apply(null, {length: this}).map(Number.call, Number);
};

Array.prototype.first = function() {
  return this[0];
};

Array.prototype.last = function() {
  return this[this.length - 1];
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
                    .map(function(distance) {
                      return 1 / distance;
                    }));
};

var sutulaMethodSelection = function sutulaMethodSelection(distances) {
  var sortedDistances = distances.map(function(distance, i) {
    return {
      distance: distance,
      index   : i
    };
  }).sorted(function(a, b) {
    return a.distance - b.distance;
  });

  var dist_range = sortedDistances.last().distance - sortedDistances.first().distance;
  var probs = [];

  if(dist_range < 0.0001) {
    return (sortedDistances.length).times().map(function(i) {
      return 1;
    });
  }

  var getProb = function(min, max, range, amount) {
    return (max - min) * (1.0 / range) * (1.0 / amount);
  };

  for(var i = 0; i < distances.length; ++i) {
    var prob = 0;

    for(var j = i + 1; j < distances.length; ++j) {
      prob += getProb(sortedDistances[j - 1].distance, sortedDistances[j].distance, dist_range, j);
    }

    probs.push({
      prob: prob,
      index: sortedDistances[i].index
    });
  }

  return probs.sorted(function(a, b) {
    return a.index - b.index;
  }).map(function(item) {
    return item.prob;
  });
};

var getTotalDistance = function getTotalDistance(chromosome, cities) {
  var genes = chromosome.getGenes(),
      totalDistanceLength = 0;

  for(var i = 0; i < chromosome.getSize(); ++i) {
    try {
      totalDistanceLength += cities[genes[i]].calculateDistanceTo(cities[(genes[(i + 1) % cities.length])]);
    } catch(e) {
      debugger;
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
  fitness: fitness,
  sutulaMethodSelection: sutulaMethodSelection
};