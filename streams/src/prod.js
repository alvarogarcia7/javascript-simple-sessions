'use strict';

const match = require('./pattern_matching');

module.exports = {infiniteNaturals};

class InfiniteNaturalStream {

  constructor(value) {
    this.value = value;
  }

  next() {
    return new InfiniteNaturalStream(this.value + 1);
  }

  take(n) {
    const take_ = funct((result, n) =>
      match({result, n},
        ({n}) => n === 0, ({result}) =>  result,
        () => true, ({result, n}) => result.concat([this.value]).concat(this.next().take(n-1))
    ));

    return take_([], n);
  }
}

function infiniteNaturals() {
  return new InfiniteNaturalStream(1);
}

/**
 * Binds the parameter with the correct `this`
 * @param lambda
 * @returns {function(this:funct)}
 */
function funct(lambda) {
  return lambda.bind(this);
}