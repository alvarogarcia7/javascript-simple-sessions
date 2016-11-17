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

function reduce({array, function_}) {
  return array.reduce(function_);
}