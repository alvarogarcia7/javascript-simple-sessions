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
    const newIngredients = this.ingredients.flatMap(ingredient => {
     if(ingredient.name === 'cheese') {
      return [ingredient, ingredient];
     } else {
       return [ingredient];
     }
     });
    const kebab = (new Kebab(newIngredients));
    console.log(kebab);
    return kebab;
  }
  noOnions() {
    const newIngredients = this.ingredients.filter(ingredient => ingredient.name !== 'onions')
    return new Kebab(newIngredients)
  }
}



exports['default'] = Kebab;
module.exports = exports['default'];


Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};