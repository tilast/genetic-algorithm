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

module.exports = Gene;