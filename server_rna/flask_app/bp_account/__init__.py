from flask import Blueprint

bp_account = Blueprint('bp_account', __name__, url_prefix='/account')
from . import views
