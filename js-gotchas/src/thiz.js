'use strict';

module.exports = {noThis,withThis};

function noThis() {
  const props = {
    age: 1
  };
  return {
    age: () => props.age
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