'use strict';

const chai = require('chai');
const should = require('should');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/thiz');

describe('This', () => {
  describe('depends on the context', () => {
    it('not using "this"', () => {
      expect(modul.noThis().age()).to.eql(1);
    });

    it('using "this", directly', () => {
      expect(modul.withThis().age()).to.eql(1);
    });

    it('using "this", keeping a reference to the whole object', () => {
      const withThis = modul.withThis();
      expect(withThis.age()).to.eql(1);
    });

    it('using "this", keeping a reference to a function depending on this', () => {
      const state = modul.withThis().age;

      let exception = undefined;
      try {
        expect(state()).to.eql(undefined);
      } catch (e) {
        exception = e;
        expect(exception.message).to.contain('Cannot read property');
      } finally {
        if (exception === undefined) {
          should.fail('Should have thrown an exception');
        }
      }
    });
  });
});
