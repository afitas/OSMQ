import os
from flask import Flask
from .extentions import csrf_protect, db, migrate, babel
from config import app_config
from .jinja_filters import register_jinja_filters


def create_app(config_name="development"):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    if os.path.isfile(os.path.join(app.instance_path, "config.py")):
        app.config.from_pyfile("config.py")
    app.config["config_name"] = config_name

    register_jinja_filters(app)
    register_extensions(app)
    register_blueprints(app)
    return app


def register_extensions(app):
    """Register Flask extensions."""
    db.init_app(app)
    app.app_context().push()
    csrf_protect.init_app(app)
    migrate.init_app(app, db)
    babel.init_app(app)
    return None


def register_blueprints(app):
    """Register Flask blueprints."""
    from .bp_dashboard import bp_dashboard
    app.register_blueprint(bp_dashboard)
    from .bp_map import bp_map
    app.register_blueprint(bp_map)
    return None