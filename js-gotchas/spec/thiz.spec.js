'use strict';

const chai = require('chai');
const should = require('should');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/thiz');

describe('This', () => {
  describe('depends on the context', () => {
    describe('in an object', () => {

      it('not using "this"', () => {
        expect(modul.noThis().age()).to.eql(1);
      });

      it('using "this", directly', () => {
        expect(modul.withThisUsingOldFunctionSyntax().age()).to.eql(1);
      });

      it('using "this", keeping a reference to the whole object', () => {
        const withThis = modul.withThisUsingOldFunctionSyntax();
        expect(withThis.age()).to.eql(1);
      });

      it('using "this", keeping a reference to a function depending on this', () => {
        // inline this function to see the test fail
        const state = modul.withThisUsingOldFunctionSyntax().age;

        tryCatch({
          test: () => expect(state()).to.eql(undefined),
          assertion: (exception) => expect(exception.message).to.contain('Cannot read property'),
          failure: () => 'Should have thrown an exception'});
      });

      it('using "this", keeping a reference to a function depending on this + injecting the context', () => {
        const age = modul.withThisUsingOldFunctionSyntax().age;
        const boundAge = age.bind({props: {age:3}});
        expect(boundAge()).to.eql(3);
      });
    });

    describe('inside another function', () => {
      it('context is lost', () => {
        tryCatch({
          test: () => expect(modul.sum1To(2)).to.eql(3),
          assertion: (exception) => expect(exception.message).to.contain('Cannot read property'),
          failure: () => 'Should have thrown an exception'});
      });

      it('context is lost, but you can bind it', () => {
        expect(modul.boundSum1To(2)).to.eql(3);
      });
    });

  });

  describe('can be bound', () => {
    it('using the function "bind"', () => {
      const age = modul.withThisUsingOldFunctionSyntax().age;
      const boundAge = age.bind({props: {age:99}});
      expect(boundAge()).to.eql(99);
    });
  });
});

function tryCatch({test, assertion, failure}) {
  let exception = undefined;
  try {
    test();
  } catch (e) {
    exception = e;
    assertion(exception);
  } finally {
    if (exception === undefined) {
      should.failure(failure);
    }
  }
}
