import logging
from datetime import datetime
from flask import abort
from flask_app import app_config

LOG_PATH = app_config.get("production").LOG_PATH

def check_licence(pk_commune):
    if type(pk_commune) == str and not pk_commune == "0001" and not pk_commune.startswith("31"):
        abort(400)
