'use strict';

module.exports = [
  {
    name: 'root',
    alias: 'r',
    description: 'Inspect the containers as the root user.',
    type: Boolean
  },
  {
    name: 'check',
    alias: 'c',
    description: '(NOT-YET-IMPLEMENTED) Check if the docker is intalled, ' +
    'running and whether it can be run without the sudo command.',
    type: Boolean
  },
  {
    name: 'init',
    alias: 'i',
    description: '(NOT-YET-IMPLEMENTED) Adds the current user to docker group.',
    type: Boolean
  },
  {
    name: 'list',
    description: '(NOT-YET-IMPLEMENTED) List the running containers.',
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
