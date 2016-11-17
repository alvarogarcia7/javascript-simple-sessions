'use strict';

module.exports = {noThis,withThisUsingOldFunctionSyntax};

function noThis() {
  const props = {
    age: 1
  };
  return {
    age: () => props.age
  };
}

function withThisUsingOldFunctionSyntax() {
  return {
    props: {
      age:1
    },
    age: function () { return this.props.age;}
  };
}