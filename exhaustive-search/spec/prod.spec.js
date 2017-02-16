'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const ExhaustiveSearch = require('./../src/prod').ExhaustiveSearch;

describe('Exhaustive search', () => {
  //   1
  // 2    5
  //3 4  6 7
  const tree = {left: {left: {node: 3}, node: 2, right: {node: 4}}, node: 1, right: {left: {node: 6}, node: 5, right:{node: 7}}};
  const bothChildrenWhenPresent = (tree) => { 
    return [tree.left, tree.right].filter(child=>child);
  };

  describe('traverses the whole tree', () => {
    const addition = (tree, children) => {
      const sumOfChildren = children.reduce((acc, ele) => acc+ele, 0);
      return tree.node + sumOfChildren;
    };

    it('with addition', () => {
      expect(new ExhaustiveSearch(bothChildrenWhenPresent, addition).search(tree)).to.equal(28);
    });
  });

});
