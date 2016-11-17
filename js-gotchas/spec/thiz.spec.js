'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;

const modul = require('./../src/thiz');

describe('This', () => {
  it('depends on the context', () => {
    expect(modul.noThis().state()).to.eql(1);
  });
});
