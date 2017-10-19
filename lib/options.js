'use strict';

// const fs = require('fs');

// const FileDetails = (filename) => {
//   this.filename = filename;
//   this.exists = fs.existsSync(filename);
//   return this;
// };

module.exports = [
  // {
  //   name: 'answer-file',
  //   alias: 'a',
  //   typeLabel: '[underline]{file}',
  //   description: 'The path to the file with the answers. This runs the non-interactive mode.',
  //   type: FileDetails,
  //   defaultOption: true
  // },
  {
    name: 'check',
    alias: 'c',
    description: 'Check if the docker is intalled, running and whether it can be run without the sudo command.',
    type: Boolean
  },
  {
    name: 'init',
    alias: 'i',
    description: 'Adds the current user to docker group.',
    type: Boolean
  },
  {
    name: 'list',
    description: 'List the running containers.',
    alias: 'l',
    type: Boolean
  },
  {
    name: 'version',
    alias: 'v',
    type: Boolean,
    description: 'Print the dosh version.'
  },
  {
    name: 'help',
    description: 'Prints this usage guide.',
    alias: 'h',
    type: Boolean
  }
];
