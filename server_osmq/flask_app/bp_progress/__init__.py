from flask import Blueprint

bp_progress = Blueprint('bp_progress', __name__, url_prefix='/progress')
from . import views
