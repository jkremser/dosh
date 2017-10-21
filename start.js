#!/usr/bin/env node

const index = require('./index');
const returnCode = index.main();

if (returnCode !== 0) {
  process.exit(returnCode);
}
