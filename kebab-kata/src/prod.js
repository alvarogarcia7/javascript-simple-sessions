'use strict';

class Kebab {

  static withIngredients(...ingredients) {
    return new Kebab(ingredients);
  }

  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  isVegetarian() {
    return this.ingredients.reduce((acc, element) => element.isVegetarian() && acc, true);
  }
  isPescatarian() {
    return this.ingredients.reduce((acc, element) => element.isPescatarian() && acc, true);
  }
  doubleCheese() {
    return this;
  }
  noOnions() {
    return this;
  }
}



exports['default'] = Kebab;
module.exports = exports['default'];