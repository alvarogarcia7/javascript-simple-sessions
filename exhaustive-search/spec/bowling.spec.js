'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const ExhaustiveSearch = require('./../src/prod').ExhaustiveSearch;

describe('Exhaustive search', () => {
  const tree = {left: {left: {node: 3}, node: 2, right: {node: 4}}, node: 1, right: {left: {node: 6}, node: 5, right:{node: 7}}};
  const expansion = (tree) => { 
    const children = [];
    if (tree.left) {
      children.push(tree.left);
    }
    if (tree.right) {
      children.push(tree.right);
    }
    return children;
  };

  describe('traverses the whole tree', () => {
    const reduction = (tree, children) => {
      return children.reduce((acc, ele) => acc+ele, tree.node);
    };

    it('with addition', () => {
      expect(new ExhaustiveSearch(expansion, reduction).search(tree)).to.equal(28);
    });
  });

});
