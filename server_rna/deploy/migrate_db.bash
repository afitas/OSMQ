#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -d $DIR/../.venv ]] || python -m venv $DIR/../.venv 
source $DIR/../.venv/bin/activate 
pip install -r $DIR/../requirements.txt

cd $DIR/..
export FLASK_CONFIG=production
export FLASK_APP=/home/adminrna/rna/server_rna/run.py

#if not exist "migrations" flask db init

flask db migrate
flask db upgrade