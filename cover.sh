#!/bin/bash
set -x

DIR=`dirname $0`
$DIR/node_modules/istanbul/lib/cli.js cover $DIR/node_modules/mocha/bin/_mocha -- -R spec $@

mkdir $DIR/coverage-tmp &> /dev/null || true
mv $DIR/coverage/coverage.json $DIR/coverage-tmp/coverage-$$.json
rm -rf $DIR/coverage/ &> /dev/null || true
