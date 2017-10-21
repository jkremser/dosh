/* eslint-env mocha */
/* eslint-disable */

'use strict';

const chai = require('chai');

const expect = chai.expect;
const d = require('../lib/docker');
const chaiProcess = require('@evolopment/chai-process');
const chaiAsPromised = require('chai-as-promised');
const cexec = chaiProcess.exec;
const execSync = require('child_process').execSync;

chai.use(chaiProcess);
chai.use(chaiAsPromised);

describe('#docker ps', () => {
  before(() => {
    execSync('docker kill `docker ps -q` &> /dev/null || true');
  });

  describe('with no running container should', () => {
    it('not throw any exceptions', () => {
      expect(d.ps).to.not.throw;
    });

    it('list no running containers', () => {
      expect(d.ps()).to.be.empty;
    });
  });

  describe('with three running containers should', () => {
    before(() => {
        cexec('docker run busybox sleep 1.2');
        cexec('docker run busybox sleep 1.1');
        cexec('docker run busybox sleep 1.0');
    });

    it('not throw any exceptions', () => {
      expect(d.ps).to.not.throw;
    });

    it('list those three running containers', (done) => {
      setTimeout(()=> {
        expect(d.ps()).to.be.an('array').that.has.length(3);
        done();
      }, 300);
    });
  });
});
