from flask import render_template
from flask_security import login_required, roles_required, current_user, roles_accepted
from flask_app import consts
from . import bp_map


@bp_map.route('/', methods=['GET'])
@login_required
# @roles_accepted(consts.ROLE_NATIONAL)
def map(pk=None):
    return render_template('map/edit_map.html', api_key=str(current_user.api_key))
