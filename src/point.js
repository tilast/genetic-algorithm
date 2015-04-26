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
}

module.exports = Point;