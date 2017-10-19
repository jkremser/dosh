'use strict';

const usage = require('./lib/usage');
const tui = require('./lib/tui');
const optionDefinitions = require('./lib/options');
const _ = require('lodash');
const chalk = require('chalk');
const version = require('./package.json').version;
const commandLineArgs = require('command-line-args');
const figlet = require('figlet');

const printVersion = () => console.log(version);

const main = () => {
  try {
    const options = commandLineArgs(optionDefinitions);
    if (_.isEmpty(options)) {
      console.log('\x1B[2J');
      console.log(
        chalk.yellow(
          figlet.textSync('dosh', {
            horizontalLayout: 'fitted'
          }
        )
      ));
      tui.all();
    } else if (options.version) {
      printVersion();
    } else if (options.help) {
      usage.printUsage();
    }
  } catch (err) {
    console.log(`\n${chalk.red(err.message)}`);
    usage.printUsage();
    process.exit(1);
  }
};

module.exports = {
  main,
  version
};
