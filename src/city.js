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

module.exports = City;