/* eslint-env mocha */
/* eslint-disable */

'use strict';

const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const chaiProcess = require('@evolopment/chai-process');
const chaiAsPromised = require('chai-as-promised');

const cspawn = chaiProcess.spawn;
const cexec = chaiProcess.exec;
const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;
const cwd = path.dirname(module.filename);

const i = require('inquirer-test');

chai.use(chaiProcess);
chai.use(chaiAsPromised);

before(() => process.chdir(cwd));

describe('#tui', () => {
  before(() => {
    execSync('docker kill `docker ps -q` &> /dev/null || true');
  });

  it('exporting the modules should not fail', () => {
    return expect(cspawn('node', ['../lib/tui.js'])).to.eventually.succeed;
  });

  describe('with no containers', () => {
    describe('all() method should', () => {
      it('not fail', () => {
        return expect(cexec(`node -e "require('../lib/tui.js').all()"`)).to.eventually.succeed;
      });

      it('print \'No containers\'', () => {
        return expect(cexec(`node -e "require('../lib/tui.js').all()"`)).to.eventually.stdout().contain('No containers are running');
      });
    });

    it('runBash(hash) should be runnable', () => {
      return expect(cexec(`node -e "require('../lib/tui.js').runBash('asdf')"`)).to.eventually.succeed;
    });
  });

  describe('with one running container', () => {

    before(() => {
        cexec('docker run busybox sleep 1.5');
    });

    describe('all() method should', () => {
      it('print the container', (done) => {
        const proc = spawn('node', ['../lib/tui-show.js'], { stdio: ['pipe', 'pipe', 'pipe'] });
        proc.stdout.pipe(process.stdout);
        setTimeout(() => {
          const ENTER = '\x0D';
          proc.stdin.setEncoding('utf-8');
          proc.stdin.write(ENTER);
          proc.stdin.end();
          proc.kill('SIGINT');
          done();
        }, 500);
      });
    });
  });
});
