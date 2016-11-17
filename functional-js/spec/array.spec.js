'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/array');

var arrayNumbers = [1,2,3,4,5]

describe("Array's functional features", () => {
  describe('map', () => {
    it('respects the shape of the array, applying a function to each element', () => {
      expect(modul.mapWithoutIndex(arrayNumbers, (element) => element+1)).to.eql([2,3,4,5,6]);
    });
  });
});
