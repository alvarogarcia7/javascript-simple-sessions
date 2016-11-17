'use strict';

module.exports = {noThis,withThis};

function noThis() {
  const state = {
    age: 1
  };
  return {
    state: () => state.age
  };
}

function withThis() {
  return {
    props: {
      age:1
    },
    state: function () { return this.props.age;}
  };
}