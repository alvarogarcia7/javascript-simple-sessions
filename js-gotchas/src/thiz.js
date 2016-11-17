'use strict';

module.exports = {noThis};

function noThis() {
  const state = {
    age: 1
  };
  return {
    state: () => state.age
  };
}