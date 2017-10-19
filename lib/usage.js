'use strict';

const optionDefinitions = require('./options');
const getUsage = require('command-line-usage');
const repoUrl = require('../package.json').repository.url;

const sections = [
  {
    header: 'Dosh',
    content: 'This CLI tool interactively displays what [italic]{Docker} ' +
    'containers are running and allows to run a shell script inside.'
  },
  {
    header: 'Usage',
    content: '[bold]{dosh}\n[bold]{dosh} [OPTION]'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    content: `Project home: [underline]{${repoUrl}}`
  }
];

const printUsage = () => console.log(getUsage(sections));

module.exports = {
  printUsage
};
