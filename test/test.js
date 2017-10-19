/* eslint-env mocha */

'use strict';

const expect = require('chai').expect;
const numFormatter = require('../index');

describe('#numFormatter', () => {
  it('should convert single digits', () => {
    const result = numFormatter(1);
    expect(result).to.equal('1');
  });

  it('should convert double digits', () => {
    const result = numFormatter(12);
    expect(result).to.equal('12');
  });

  it('should convert triple digits', () => {
    const result = numFormatter(123);
    expect(result).to.equal('123');
  });

  it('should convert 4 digits', () => {
    const result = numFormatter(1234);
    expect(result).to.equal('1,234');
  });

  it('should convert 5 digits', () => {
    const result = numFormatter(12345);
    expect(result).to.equal('12,345');
  });

  it('should convert 6 digits', () => {
    const result = numFormatter(123456);
    expect(result).to.equal('123,456');
  });

  it('should convert 7 digits', () => {
    const result = numFormatter(1234567);
    expect(result).to.equal('1,234,567');
  });

  it('should convert 8 digits', () => {
    const result = numFormatter(12345678);
    expect(result).to.equal('12,345,678');
  });
});
