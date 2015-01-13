#!/usr/bin/env bash
set -e

error() { echo "$0: $1"; exit 1; }

[[ "$TRAVIS" ]] || error "this script assumes it's running within TravisCI"
[[ "$TRAVIS_PULL_REQUEST" == "false" ]] || error "pull request builds disabled"

echo "machine github.com login $CI_USER_TOKEN" >> ~/.netrc
