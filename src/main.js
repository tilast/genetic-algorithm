var PopulationWorld = require('./population_world');
var City = require('./city');
var Point = require('./point');

var cities = [];

// cities.push(new City( {name: "Los Angeles", coords: new Point({x: 0, y: 0})} ));
// cities.push(new City( {name: "Miami",  coords: new Point({x: 3, y: 0})} ));
// cities.push(new City( {name: "Seattle", coords: new Point({x: 0, y: 4})} ));

// cities.push(new City( {name: "A", coords: new Point({x: 60, y: 300})} ));
// cities.push(new City( {name: "B", coords: new Point({x: 100, y: 500})} ));
// cities.push(new City( {name: "C", coords: new Point({x: 349, y: 420})} ));
// cities.push(new City( {name: "D", coords: new Point({x: 47, y: 190})} ));
// cities.push(new City( {name: "E", coords: new Point({x: 100, y: 100})} ));
// cities.push(new City( {name: "F", coords: new Point({x: 400, y: 200})} ));
// cities.push(new City( {name: "G", coords: new Point({x: 400, y: 280})} ));
// cities.push(new City( {name: "H", coords: new Point({x: 220, y: 500})} ));
// cities.push(new City( {name: "K", coords: new Point({x: 400, y: 512})} ));

var points = [282.920601761, 240.192688771,
311.755613444, 350.55661522,
336.932896782, 349.084953235,
318.415931638, 256.05256963,
293.672288938, 251.458355931,
480.353594241, 363.058928923,
171.347425719, 443.294722569,
301.244125627, 113.620853689,
294.256186608, 98.6610596663,
449.260630122, 173.752157021,
221.688257026, 119.870986678,
354.753271123, 111.54071043,
287.64065948, 357.836434962,
336.297721379, 329.36537577,
322.768134042, 252.029046411,
280.708780993, 245.595438424,
486.31388301, 387.794590773,
417.776543084, 447.239047879,
172.95700707, 164.669429449,
308.72281828, 247.710648001,
324.785492607, 264.157372636,
256.351345599, 251.263373914,
310.380500327, 355.787232388,
100.394689626, 301.985756303,
254.979773508, 482.405470515,
253.863885258, 309.387735894,
122.743610053, 375.854918693,
349.702703571, 275.2431212,
312.867909525, 496.548628469,
350.122180718, 331.125546229];

for(var i = 0; i < points.length; i += 2) {
  cities.push(new City( {name: "", coords: new Point({x: points[i], y: points[i+1]})} ));
}

console.log(cities.map(function(city){ return city.getName() + ': ' + city.getCoords().getX() + ' ' + city.getCoords().getY(); }));

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

// console.log(brutforceMethodSelection([50, 60, 70, 80, 100, 90]));

// working part
window.addEventListener('load', function() {
  // initCanvas();

  var population = new PopulationWorld({
    cities: cities,
    populationSize: 100
  });

  document.querySelector("#run").addEventListener('click', function() {
    population.run();
  });
});
// Жив був Круш. За 3.9 земель. І була в Круша 3 дочки-бочки. Перша дочка Свєта. 
// Вона цілувалась з жирними мужикамі, коли було лєто.
// Друга була Анджела. Вона цілувалась з усіма мужиками в СНГ.
// Третя була Валюха. Вона цілувалась з хачамі, а потім їх динамила.
// Але тут трапилось бєда... (мєрзость)
