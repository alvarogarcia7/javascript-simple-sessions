'use strict';

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

module.exports = {ExhaustiveSearch};
