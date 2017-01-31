'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const Kebab = require('./../src/prod');

// vegetarian implies pescatarian
const meat =  {name: 'meat', isVegetarian: () => false, isPescatarian: () => false};
const fish =  {name: 'fish', isVegetarian: () => false, isPescatarian: () => true};
const cheese =  {name: 'cheese', isVegetarian: () => true, isPescatarian: () => true};
const shrimp =  {name: 'shrimp', isVegetarian: () => false, isPescatarian: () => true};
const bbqSauce =  {name: 'bbqSauce', isVegetarian: () => false, isPescatarian: () => false};
const oysterSauce=  {name: 'oysterSauce', isVegetarian: () => false, isPescatarian: () => true};
const garlicSauce=  {name: 'garlicSauce', isVegetarian: () => true, isPescatarian: () => true};
const hotSauce=  {name: 'hotSauce', isVegetarian: () => true, isPescatarian: () => true};
const cheeseSauce =  {name: 'cheeseSauce ', isVegetarian: () => true, isPescatarian: () => true};

describe('Kebab', () => {
  describe('is vegetarian', () => {
    it('by default', () => {
      expect(Kebab.withIngredients().isVegetarian()).to.eql(true);
    });
  });
  describe('non vegetarian', () => {
    it('if it includes meat', () => {
      expect(Kebab.withIngredients(meat).isVegetarian()).to.eql(false);
    });
  });
  describe('pescatarian', () => {
    it('if it includes fish', () => {
      expect(Kebab.withIngredients(fish).isPescatarian()).to.eql(true);
    });

    it('if it includes shrimp', () => {
      expect(Kebab.withIngredients(shrimp).isPescatarian()).to.eql(true);
    });

    it('not if it includes meat', () => {
      expect(Kebab.withIngredients(meat).isPescatarian()).to.eql(false);
    });
  });

  describe('multiple ingredients', () => {
    it('keeps the vegetarian, pescatarian properties', () => {
      expect(Kebab.withIngredients(fish,meat).isPescatarian()).to.eql(false);
      expect(Kebab.withIngredients(fish,meat).isVegetarian()).to.eql(false);
    });
  });

  describe('sauces ingredients', () => {
    it('keeps the vegetarian, pescatarian properties', () => {
      expect(Kebab.withIngredients(bbqSauce).isVegetarian()).to.eql(false);
      expect(Kebab.withIngredients(bbqSauce).isPescatarian()).to.eql(false);
    });
    it('keeps the vegetarian, pescatarian properties', () => {
      expect(Kebab.withIngredients(oysterSauce).isVegetarian()).to.eql(false);
      expect(Kebab.withIngredients(oysterSauce).isPescatarian()).to.eql(true);
    });
  });

  describe('acceptance tests', () => {
    it('fish is not vegetarian', () => {
      expect(Kebab.withIngredients(fish).isVegetarian()).to.eql(false);
    });
  });


});
