#!/usr/bin/env node

const index = require('./index');
const returnCode = index.main();
process.exit(returnCode);
