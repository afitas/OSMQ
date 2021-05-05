from flask import Blueprint

bp_decision = Blueprint('bp_decision', __name__, url_prefix='/decision')
from . import views
