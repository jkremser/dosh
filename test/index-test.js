/* eslint-env mocha */
/* eslint-disable */

'use strict';

const expect = require('chai').expect;
const dosh = require('../index');
const desiredVersion = require('../package.json').version;

describe('#dosh index.js', () => {
  it('with -v param should not fail', () => {
    const bak = process.argv;
    process.argv = ['', '', '-v'];
    expect(dosh.main).to.not.throw();
    process.argv = bak;
  });

  it('with --version param should not fail', () => {
    const bak = process.argv;
    process.argv = ['', '', '--version'];
    expect(dosh.main).to.not.throw();
    process.argv = bak;
  });

  it('with -h param should not fail', () => {
    const bak = process.argv;
    process.argv = ['', '', '-h'];
    expect(dosh.main).to.not.throw();
    process.argv = bak;
  });

  it('with --help param should not fail', () => {
    const bak = process.argv;
    process.argv = ['', '', '--help'];
    expect(dosh.main).to.not.throw();
    process.argv = bak;
  });

  xit('with --sdf param should fail', () => {
    const bak = process.argv
    process.argv = ['', '', '--sdf'];
    expect(dosh.main).to.throw();
    process.argv = bak
  });

  it('version should correspond', () => {
    expect(dosh.version).to.be.equal(desiredVersion);
  });
});
