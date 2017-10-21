'use strict';

// modules
const inquirer = require('inquirer');
const chalk = require('chalk');
const d = require('./docker');
const _ = require('lodash');
const figlet = require('figlet');

let wannabeRoot = false;

const show = () => {
  const containers = d.ps();
  const str = (s, n) => _.padEnd(_.truncate(s, { length: n - 3, omission: '..' }), n);
  const prettyContainers = _.map(containers,
    c => ({ name: `${str(c.name, 20)}${str(c.image, 40)}` +
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
        `${_.padEnd('  Name', 22)}${_.padEnd('Image', 40)}${_.padEnd('Hash', 15)}` +
        `${_.padEnd('Command', 20)}${_.padEnd('Time', 20)}\n`
      ) +
      chalk.grey(
        `${_.padEnd('  ----', 22)}${_.padEnd('-----', 40)}${_.padEnd('----', 15)}` +
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
  d.inspect(containerHash, wannabeRoot);
  return 0;
};

const all = (root) => {
  wannabeRoot = root;
  show().then(answers => runBash(answers.hash));
};

module.exports = {
  show,
  all,
  runBash
};
