#!/bin/bash
set -x
DIR=`dirname $0`

$DIR/cover.sh $DIR/lib/tui-show.js
$DIR/cover.sh $DIR/start.js
$DIR/cover.sh $DIR/node_modules/mocha/bin/_mocha $DIR/test
$DIR/node_modules/istanbul-combine/cli.js -d $DIR/coverage -p summary -r lcov -r html $DIR/coverage-tmp/*.json
rm -rf $DIR/coverage-tmp &> /dev/null || true
