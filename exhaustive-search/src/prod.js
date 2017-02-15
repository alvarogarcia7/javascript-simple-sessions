'use strict';
const tree = {left: {left: {node: 3}, node: 2, right: {node: 4}}, node: 1, right: {left: {node: 6}, node: 5, right:{node: 7}}}
const expansion = (tree) => { 
  const children = [];
  if(tree.left) {
    children.push(tree.left);
  }
  if(tree.right) {
    children.push(tree.right);
  }
  return children;
}
const reduction = (tree, children) => {
  return children.reduce((acc, ele) => acc+ele, tree.node);
}

module.exports = {search, tree, expansion, reduction};

class ExhaustiveSearch {

  constructor(expansion, reduction) {
    this.expansion = expansion;
    this.reduction = reduction;
  }

  search(payload) {
    const children = this.expansion(payload).map(this.search.bind(this));
    return this.reduction(payload, children);
  }
}

function search(expansion, reduction) {
  return new ExhaustiveSearch(expansion, reduction);
}
