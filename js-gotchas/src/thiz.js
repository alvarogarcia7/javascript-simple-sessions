'use strict';

module.exports = {noThis,withThis};

function noThis() {
  const state = {
    age: 1
  };
  return {
    age: () => state.age
  };
}

function withThis() {
  return {
    props: {
      age:1
    },
    age: function () { return this.props.age;}
  };
}