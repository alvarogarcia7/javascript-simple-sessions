'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/retoorn');

describe('Return', () => {
  describe('be careful with newlines', () => {
    it('using a newline', () => {
      expect(modul.usingNewline()).to.eql(undefined);
    });

    it('not using a newline', () => {
      expect(modul.notUsingNewline()).to.eql({age: 1});
    });
  });
});
