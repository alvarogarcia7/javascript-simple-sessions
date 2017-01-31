'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/bowling');

describe('Bowling', () => {
  describe('calculates scores for a single roll', () => {
    it('only 9 pins', () => {
      expect(modul.score('9-')).to.equal(9);
    });
    it('only 10 pins', () => {
      expect(modul.score('91')).to.equal(10);
    });
    it('including a spare in last roll', () => {
      expect(modul.score('8/')).to.equal(10);
    });
    it('including a strike', () => {
      expect(modul.score('+X+')).to.equal(10);
    });
  });
  describe('calculates scores for multiple rolls', () => {
    it('including a spare', () => {
      expect(modul.score('9/12')).to.equal(14);
    });
    it('including a spare in last roll', () => {
      expect(modul.score('9-8/')).to.equal(19);
    });
    it('including a strike, but a miss on the second throw', () => {
      expect(modul.score('+X+9-')).to.equal(10+9+9);
    });
  });
});
