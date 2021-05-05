#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -d $DIR/../.venv ]] || python -m venv $DIR/../.venv
source $DIR/../.venv/bin/activate
cd $DIR/.. && $DIR/../.venv/bin/gunicorn --workers 17 --bind 127.0.0.1:8000  -m 007 wsgi:application