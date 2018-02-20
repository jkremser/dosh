/* eslint-env mocha */
/* eslint-disable */

'use strict';

const expect = require('chai').expect;
const dosh = require('../index');
const desiredVersion = require('../package.json').version;
const execSync = require('child_process').execSync;

describe('#dosh index.js', () => {
  before(() => {
    execSync('docker kill `docker ps -q` &> /dev/null || true');
  });

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

  it('with -r param should not fail', () => {
    const bak = process.argv;
    process.argv = ['', '', '-r'];
    expect(dosh.main).to.not.throw();
    process.argv = bak;
  });

  it('with -r param should return 0', () => {
    const bak = process.argv;
    process.argv = ['', '', '-r'];
    expect(dosh.main()).to.be.equal(0);
    process.argv = bak;
  });

  it('with -d param should not fail', () => {
    const bak = process.argv;
    process.argv = ['', '', '-d'];
    expect(dosh.main).to.not.throw();
    process.argv = bak;
  });

  it('with -d param should return 0', () => {
    const bak = process.argv;
    process.argv = ['', '', '-d'];
    expect(dosh.main()).to.be.equal(0);
    process.argv = bak;
  });

  it('with no params should return 0', () => {
    const bak = process.argv;
    process.argv = ['', ''];
    expect(dosh.main()).to.be.equal(0);
    process.argv = bak;
  });

  it('with --sdf param should fail', () => {
    const bak = process.argv
    process.argv = ['', '', '--sdf'];
    expect(dosh.main()).to.be.equal(1);
    process.argv = bak
  });

  it('version should correspond', () => {
    expect(dosh.version).to.be.equal(desiredVersion);
  });
});
