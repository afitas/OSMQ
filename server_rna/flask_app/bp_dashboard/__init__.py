from flask import Blueprint

bp_dashboard = Blueprint('bp_dashboard', __name__, url_prefix='/')
from . import views
