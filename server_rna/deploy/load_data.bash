#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -d $DIR/../.venv ]] || python -m venv $DIR/../.venv
source $DIR/../.venv/bin/activate
cd $DIR/..
python load_data.py