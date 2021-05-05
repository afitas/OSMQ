import flask
from flask_babel import lazy_gettext as _l

""" example
def display_state(state):
    if state == 1:
        return _l("Archivé")
    if state == 2:
        return _l("Publié")
    if state == 3:
        return _l("En attente")
    if state == 4:
        return _l("A modifier")
"""


def register_jinja_filters(app):
    pass
    #app.jinja_env.filters['display_state'] = display_state



