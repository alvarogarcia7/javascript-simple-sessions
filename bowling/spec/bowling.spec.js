'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/bowling');

describe('Bowling', () => {
  describe('acceptance tests', () => {
      // it('12 rolls, 12 strikes - perfect game', () => {
      //   expect(modul.score('+XXXXXXXXXXXX+')).to.equal(300);
      // });
  });

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
    it('including a strike, that doubles both throws on the next roll', () => {
      expect(modul.score('+X+81')).to.equal(28);
    });
    it('including a strike, that doubles both throws on the next roll', () => {
      expect(modul.score('+XX+81')).to.equal((10+10+8)+(10+8+1)+(8+1));
    });
  });
});
