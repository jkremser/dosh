'use strict';

// modules
const inquirer = require('inquirer');
const chalk = require('chalk');
const d = require('./docker');
const _ = require('lodash');
const figlet = require('figlet');

const show = () => {
  const containers = d.ps();
  const prettyContainers = _.map(containers,
    c => ({ name: `${_.padEnd(c.name, 20)}${_.padEnd(c.image, 15)}` +
    `${_.padEnd(c.hash, 15)}${_.padEnd(c.command, 25)}${_.padEnd(c.time, 15)}`,
      value: c.hash
    }));

  const noContainers = prettyContainers.length === 0;
  setTimeout(() => {
    if (noContainers) {
      console.log(chalk.grey('No containers are running.'));
      process.exit();
    }
  }, 50);

  const questions = [
    {
      type: 'list',
      name: 'hash',
      message: `What container do you want to 'dosh'?\n${chalk.dim.green(
        `${_.padEnd('  Name', 22)}${_.padEnd('Image', 15)}${_.padEnd('Hash', 15)}` +
        `${_.padEnd('Command', 25)}${_.padEnd('Time', 15)}\n`
      )}
      ${chalk.grey(
        `${_.padEnd('  ----', 22)}${_.padEnd('-----', 15)}${_.padEnd('----', 15)}` +
        `${_.padEnd('-------', 25)}${_.padEnd('----', 15)}`)
      }`,
      choices: prettyContainers
    }
  ];

  return noContainers || inquirer.prompt(questions).then((answers) => {
    (answers && answers.hash) || process.exit();
    const containerHash = answers.hash;
    console.log('\x1B[2J');
    console.log(
      chalk.yellow(
        figlet.textSync('dosh', {
          horizontalLayout: 'fitted'
        }
      )
    ));
    console.log(chalk.grey(`You are now inside container ${answers.hash}\n\nPress CTRL+D to jump out..\n`));
    d.inspect(containerHash);
  });
};

module.exports = {
  show
};
