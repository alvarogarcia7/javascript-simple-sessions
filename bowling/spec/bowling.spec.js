'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/bowling');

describe('Bowling', () => {
  describe('calculates scores for a single roll', () => {
    it('only 9 pins', () => {
      expect(modul.score('9-')).to.equal(9)
    });
  });
});
