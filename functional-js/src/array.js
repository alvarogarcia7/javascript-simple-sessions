'use strict';

module.exports = {
  mapWithoutIndex,
  mapWithIndex,
  reduce
};

function mapWithoutIndex(array, function_) {
  return array.map((element) => function_(element));
}

function mapWithIndex(array, function_) {
  return array.map((element,index) => function_(element,index));
}

function reduce({array, function_, default_}) {
  if (default_) {
    return array.reduce(function_,default_);
  } else {
    return array.reduce(function_);
  }
}