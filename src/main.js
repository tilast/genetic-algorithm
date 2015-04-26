var cities = [];

// cities.push(new City( {name: "Los Angeles", coords: new Point({x: 0, y: 0})} ));
// cities.push(new City( {name: "Miami",  coords: new Point({x: 3, y: 0})} ));
// cities.push(new City( {name: "Seattle", coords: new Point({x: 0, y: 4})} ));

cities.push(new City( {name: "A", coords: new Point({x: 60, y: 300})} ));
cities.push(new City( {name: "B", coords: new Point({x: 100, y: 500})} ));
cities.push(new City( {name: "C", coords: new Point({x: 349, y: 420})} ));
cities.push(new City( {name: "D", coords: new Point({x: 47, y: 190})} ));
cities.push(new City( {name: "E", coords: new Point({x: 100, y: 100})} ));
cities.push(new City( {name: "F", coords: new Point({x: 400, y: 200})} ));
cities.push(new City( {name: "G", coords: new Point({x: 400, y: 280})} ));
cities.push(new City( {name: "H", coords: new Point({x: 220, y: 500})} ));
cities.push(new City( {name: "K", coords: new Point({x: 400, y: 512})} ));

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
  initCanvas();

  var population = new PopulationWorld({
    cities: cities,
    populationSize: 50
  });
});
// Жив був Круш. За 3.9 земель. І була в Круша 3 дочки-бочки. Перша дочка Свєта. 
// Вона цілувалась з жирними мужикамі, коли було лєто.
// Друга була Анджела. Вона цілувалась з усіма мужиками в СНГ.
// Третя була Валюха. Вона цілувалась з хачамі, а потім їх динамила.
// Але тут трапилось бєда... (мєрзость)
