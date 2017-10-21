/* eslint-env mocha */
/* eslint-disable */

'use strict';

const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const chaiProcess = require('@evolopment/chai-process');
const chaiAsPromised = require('chai-as-promised');

const spawn = chaiProcess.spawn;
const execSync = require('child_process').execSync;
const cwd = path.dirname(module.filename);

chai.use(chaiProcess);
chai.use(chaiAsPromised);

before(() => process.chdir(cwd));

describe('#process', () => {
  before(() => {
    execSync('docker kill `docker ps -q` &> /dev/null || true');
  });

  it('`node start.js` should return zero exit code', () => {
    return expect(spawn('node', ['../start.js'])).to.eventually.succeed;
  });

  it('`node start.js -v` should return zero exit code', () => {
    return expect(spawn('node', ['../start.js', '-v'])).to.eventually.succeed;
  });

  it('`node start.js` should output \'No containers are running\'', () => {
    return expect(spawn('node', ['../start.js'])).to.eventually.stdout().contain('No containers are running');
  });

  it('`node start.js -h` should output the usage', () => {
    return expect(spawn('node', ['../start.js', '-h'])).to.eventually.stdout().contain('Project home:');
  });

  it('`node start.js --foobar` should return non-zero exit code', () => {
      return expect(spawn('node', ['../start.js', '--foobar'])).to.eventually.fail;
  });

});
