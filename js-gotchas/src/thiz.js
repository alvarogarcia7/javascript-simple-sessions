'use strict';

module.exports = {
  noThis,
  withThisUsingOldFunctionSyntax,
  withThisUsingNewFunctionSyntax,
  sum1To
};

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

function sum1To(b) {
  this.a = 1;
  return sumToA(b);

  function sumToA(b) {
    return this.a + b;
  }
}
