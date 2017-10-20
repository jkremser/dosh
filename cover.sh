#!/bin/bash
DIR=`dirname $0`
$DIR/node_modules/istanbul/lib/cli.js cover $DIR/node_modules/mocha/bin/_mocha -- -R spec $@
