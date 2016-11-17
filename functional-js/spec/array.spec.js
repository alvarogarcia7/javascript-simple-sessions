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

  describe('reduce / fold / foldl', () => {
    it('applies the function to the previous result and the current element', () => {
      const sum = (accumulator, element) => element + accumulator;
      expect(modul.reduce({array: arrayNumbers, function_: sum})).to.eql(1+2+3+4+5);
    });

    it('with reduce you can also perform the map operation', () => {
      const append = (accumulator, element) => {accumulator.push(element); return accumulator;};
      expect(modul.reduce({array: arrayNumbers, function_: append, default_:[]})).to.eql([1,2,3,4,5]);
    });

    it('reduce does not always respect the shape of the operator', () => {
      /**
       * Appends the maximum of the previous elements and the current element
       * @param accumulator: [Int], previous elements
       * @param element: Int, current element
       * @returns [Int]
       */
      const maxUpToCurrent = (accumulator, element) => {
        const previousAccumulatedMax = Math.max.apply(null, accumulator);
        const currentMax = Math.max(element, previousAccumulatedMax);
        accumulator.push(currentMax);
        return accumulator;
      };
      expect(modul.reduce({array: [1,2,1,3,1], function_: maxUpToCurrent, default_:[]})).to.eql([1,2,2,3,3]);
    });

  });
});
