#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/../../vue_apps
echo $DIR/../../vue_apps
/usr/bin/npm install
/usr/bin/npm run build