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

const inspect = (hash, wannabeRoot, debug) => {
  if (debug) {
    const debugContainer = 'jkremser/debug-container:latest';
    const args1 = ['run', '-u', '0', '-it', '--rm', '--cap-add', 'ALL',
      `--pid=container:${hash}`, `--net=container:${hash}`, debugContainer, '/bin/sh'];
    return spawnSync('docker', args1, { stdio: 'inherit' });
  }
  const args2 = _.concat((wannabeRoot ? ['exec', '-u', '0'] : ['exec']), ['-it', hash, '/bin/bash']);
  return spawnSync('docker', args2, { stdio: 'inherit' });
};

module.exports = {
  ps,
  inspect
};
