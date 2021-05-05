#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -d $DIR/../.venv ]] || python -m venv $DIR/../.venv
source $DIR/../.venv/bin/activate
cd $DIR/..
python -m compileall -b .
find . -path ./.venv -prune -false -o -not -name 'wsgi.py' -not -name 'config.py' -name "*.py"  -exec rm -f {} \;