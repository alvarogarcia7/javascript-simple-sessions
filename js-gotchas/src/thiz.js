'use strict';

module.exports = {noThis,withThisUsingOldFunctionSyntax,withThisUsingNewFunctionSyntax};

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

function withThisUsingNewFunctionSyntax() {
  return {
    props: {
      age:1
    },
    age: () => this.props.age
  };
}