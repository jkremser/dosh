'use strict';

// const optionDefinitions = require('./lib/options');
const usage = require('./lib/usage');
// const exec = require('child_process').exec;
// const execSync = require('child_process').execSync;
// const spawn = require('child_process').spawn;
// const path = require('path');

usage.printUsage();

try {
  // spawn("docker", ["exec", "-it", "459147ca0a6c", "/bin/bash"], {stdio : "inherit"});
} catch (e) {
  console.log(e);
}

module.exports = (number, locale) => number.toLocaleString(locale);
