'use strict';

class Kebab {

  constructor(...ingredients) {
    this.ingredients = ingredients;
  }

  isVegetarian() {
    return this.ingredients.reduce((acc, element) => element.isVegetarian() && acc, true);
  }
  isPescatarian() {
    return this.ingredients.reduce((acc, element) => element.isPescatarian() && acc, true);
  }
}

exports['default'] = Kebab;
module.exports = exports['default'];