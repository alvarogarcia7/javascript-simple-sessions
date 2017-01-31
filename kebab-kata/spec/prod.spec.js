'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const Kebab = require('./../src/prod');

const meat =  {name: 'meat', isVegetarian: () => false, isPescatarian: () => false};
const fish =  {name: 'fish', isVegetarian: () => false, isPescatarian: () => true};
const shrimp =  {name: 'shrimp', isVegetarian: () => false, isPescatarian: () => true};

describe('Kebab', () => {
  describe('is vegetarian', () => {
    it('by default', () => {
      expect(new Kebab().isVegetarian()).to.eql(true);
    });
  });
  describe('non vegetarian', () => {
    it('if it includes meat', () => {
      expect(new Kebab(meat).isVegetarian()).to.eql(false);
    });
  });
  describe('pescatarian', () => {
    it('if it includes fish', () => {
      expect(new Kebab(fish).isPescatarian()).to.eql(true);
    });

    it('if it includes shrimp', () => {
      expect(new Kebab(shrimp).isPescatarian()).to.eql(true);
    });

    it('not if it includes meat', () => {
      expect(new Kebab(meat).isPescatarian()).to.eql(false);
    });
  });
  describe('acceptance tests', () => {
    it('fish is not vegetarian', () => {
      expect(new Kebab(fish).isVegetarian()).to.eql(false);
    });
  });

});
