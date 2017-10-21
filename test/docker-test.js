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
        cexec('docker run busybox sleep 3.2');
        cexec('docker run busybox sleep 3.1');
        cexec('docker run busybox sleep 3.0');
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

    it('allow to inspect one', (done) => {
      setTimeout(()=> {
        const containers = d.ps();
        const proc = d.inspect(containers[0].hash);
        expect(proc.stderr).to.be.null;
        done();
      }, 100);
    });

    it('allow to inspect one with root access', (done) => {
      setTimeout(()=> {
        const containers = d.ps();
        const proc = d.inspect(containers[0].hash, true);
        expect(proc.stderr).to.be.null;
        done();
      }, 100);
    });
  });
});
