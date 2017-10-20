'use strict';

const spawnSync = require('child_process').spawnSync;
const _ = require('lodash');

const ps = () => {
  const format = '{{.ID}}\t{{.Image}}\t{{.Command}}\t{{.RunningFor}}\t{{.Names}}';
  const result = spawnSync('docker', ['ps', '--format', format]);
  const lines = _.split(result.stdout, '\n');
  return _.dropRight(_.map(lines, (line) => {
    const fields = _.split(line, '\t');
    return {
      hash: fields[0],
      image: fields[1],
      command: _.trim(fields[2], '"'),
      time: fields[3],
      name: fields[4]
    };
  }));
};

const inspect = (hash, wannabeRoot) => {
  const args = _.concat((wannabeRoot ? ['exec', '-u', '0'] : ['exec']), ['-it', hash, '/bin/bash']);
  spawnSync('docker', args, { stdio: 'inherit' });
};

module.exports = {
  ps,
  inspect
};
