'use strict';

const chai = require('chai');
const should = require('should');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/retoorn');

describe('Return', () => {
  describe('be careful with newlines', () => {
    it('using a newline', () => {
      expect(modul.usingNewline()).to.eql(undefined);
    });
  });
});
