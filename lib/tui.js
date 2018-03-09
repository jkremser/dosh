'use strict';

// modules
const inquirer = require('inquirer');
const chalk = require('chalk');
const d = require('./docker');
const _ = require('lodash');
const figlet = require('figlet');

let wannabeRoot = false;
let wantDebug = false;

const show = () => {
  const containers = d.ps();
  const str = (s, n) => _.padEnd(_.truncate(s, { length: n - 3, omission: '..' }), n);

  const prettyImage = (s, n) => {
    let image = '';
    const prefixes = ['docker.io/', 'quay.io/', 'openshift/',
      'registry.fedoraproject.org/', 'registry.access.redhat.com/'];
    if (_.some(prefixes, p => s.includes(p))) {
      const registry = /^[^/]*/.exec(s)[0];
      const rest = /[^/]*$/.exec(s)[0];
      const chunks = registry.split('.');
      if (chunks.length > 1) {
        for (let i = 0; i < chunks.length - 1; i += 1) {
          chunks[i] = chunks[i].charAt(0);
        }
        image = `${chunks.join('.')}/${rest}`;
      } else {
        image = `os/${rest}`;
      }
    }
    return _.padEnd(_.truncate(image, { length: n - 3, omission: '..' }), n);
  };
  const prettyContainers = _.map(containers,
    c => ({ name: `${str(c.name, 50)}${prettyImage(c.image, 40)}` +
    `${str(c.hash, 15)}${str(c.command, 20)}${str(c.time, 20)}`,
      value: c.hash
    }));

  const noContainers = prettyContainers.length === 0;
  if (noContainers) {
    console.log(chalk.grey('No containers are running.'));
    return Promise.resolve(false);
  }

  const questions = [
    /* eslint-disable */
    {
      type: 'list',
      name: 'hash',
      message: 'What container do you want to \'dosh\'?\n' +
      chalk.dim.green(
        `${_.padEnd('  Name', 52)}${_.padEnd('Image', 40)}${_.padEnd('Hash', 15)}` +
        `${_.padEnd('Command', 20)}${_.padEnd('Time', 20)}\n`
      ) +
      chalk.grey(
        `${_.padEnd('  ----', 52)}${_.padEnd('-----', 40)}${_.padEnd('----', 15)}` +
        `${_.padEnd('-------', 20)}${_.padEnd('----', 20)}`
      ),
      choices: prettyContainers
    }
    /* eslint-enable */
  ];

  return inquirer.prompt(questions);
};

const runBash = (containerHash) => {
  if (!containerHash) {
    return 1;
  }
  console.log('\x1B[2J');
  console.log(
    chalk.yellow(
      figlet.textSync('dosh', {
        horizontalLayout: 'fitted'
      }
    )
  ));
  console.log(chalk.grey(`You are now inside container ${containerHash}\n\nPress CTRL+D to jump out..\n`));
  d.inspect(containerHash, wannabeRoot, wantDebug);
  return 0;
};

const all = (root, debug) => {
  wannabeRoot = root;
  wantDebug = debug;
  show().then(answers => runBash(answers.hash));
};

module.exports = {
  show,
  all,
  runBash
};
