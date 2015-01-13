#!/usr/bin/env bash
set -e

error() { echo "$0: $1"; exit 1; }

[[ "$TRAVIS" ]] || error "this script assumes it's running within TravisCI"
[[ "$TRAVIS_PULL_REQUEST" == "false" ]] || error "pull request builds disabled"

npm test
