'use strict';

module.exports = {
  mapWithoutIndex,
  mapWithIndex
};

function mapWithoutIndex(array, function_) {
  return array.map((element) => function_(element));
}

function mapWithIndex(array, function_) {
  return array.map((element,index) => function_(element,index));
}