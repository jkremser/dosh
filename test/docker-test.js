/* eslint-env mocha */
/* eslint-disable */

'use strict';

const chai = require('chai');

const expect = chai.expect;
const d = require('../lib/docker');

describe('#docker ', () => {
  describe('ps should ', () => {
    it('not throw any exceptions', () => {
      expect(d.ps).to.not.throw;
    });

    it('list the running containers', () => {
      expect(d.ps()).to.be.empty;
    });
  });
});
