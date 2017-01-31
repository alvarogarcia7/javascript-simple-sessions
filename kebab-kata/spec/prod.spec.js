'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const Kebab = require('./../src/prod');

describe('Kebab', () => {
  describe('is vegetarian', () => {
    it('x', () => {
      expect(new Kebab().isVegetarian()).to.eql(true);
    });
  });
});
