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
      expect(Kebab.aNew().isVegetarian()).to.eql(true);
    });
  });
  describe('non vegetarian', () => {
    it('if it includes meat', () => {
      expect(Kebab.aNew(meat).isVegetarian()).to.eql(false);
    });
  });
  describe('pescatarian', () => {
    it('if it includes fish', () => {
      expect(Kebab.aNew(fish).isPescatarian()).to.eql(true);
    });

    it('if it includes shrimp', () => {
      expect(Kebab.aNew(shrimp).isPescatarian()).to.eql(true);
    });

    it('not if it includes meat', () => {
      expect(Kebab.aNew(meat).isPescatarian()).to.eql(false);
    });
  });

  describe('multiple ingredients', () => {
    it('keeps the vegetarian, pescatarian properties', () => {
      expect(Kebab.aNew(fish,meat).isPescatarian()).to.eql(false);
      expect(Kebab.aNew(fish,meat).isVegetarian()).to.eql(false);
    });
  });

  describe('sauces ingredients', () => {
    it('keeps the vegetarian, pescatarian properties', () => {
      expect(Kebab.aNew(bbqSauce).isVegetarian()).to.eql(false);
      expect(Kebab.aNew(bbqSauce).isPescatarian()).to.eql(false);
    });
    it('keeps the vegetarian, pescatarian properties', () => {
      expect(Kebab.aNew(oysterSauce).isVegetarian()).to.eql(false);
      expect(Kebab.aNew(oysterSauce).isPescatarian()).to.eql(true);
    });
  });

  describe('acceptance tests', () => {
    it('fish is not vegetarian', () => {
      expect(Kebab.aNew(fish).isVegetarian()).to.eql(false);
    });
  });


});
