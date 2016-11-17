'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/array');

const arrayNumbers = [1,2,3,4,5];

describe('Array\'s functional features', () => {
  describe('map', () => {
    it('respects the shape of the array, applying a function to each element', () => {
      expect(modul.mapWithoutIndex(arrayNumbers, (element) => element+1)).to.eql([2,3,4,5,6]);
    });

    it('respects the number of elements of the array, applying a function to each element', () => {
      expect(modul.mapWithoutIndex(arrayNumbers, (element) => [element, element+1])).to.eql([[1,2],[2,3],[3,4],[4,5],[5,6]]);
    });

    it('can also use the index', () => {
      expect(modul.mapWithIndex(arrayNumbers, (element, index) => index)).to.eql([0,1,2,3,4]);
    });
  });
});
