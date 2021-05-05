from flask import Blueprint

bp_map = Blueprint('bp_map', __name__, url_prefix='/map')
from . import views
