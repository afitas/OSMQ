import os
from flask import Flask, current_app
from flask_security import SQLAlchemyUserDatastore
from .extentions import csrf_protect, db, migrate, babel, security, decisionsUploadSet, rna_log
from config import app_config
from .jinja_filters import register_jinja_filters



def create_app(config_name="development"):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    if os.path.isfile(os.path.join(app.instance_path, "config.py")):
        app.config.from_pyfile("config.py")
    app.config["config_name"] = config_name

    create_dirs(app)
    register_jinja_filters(app)
    register_extensions(app)
    register_blueprints(app)
    
    from flask_app import consts
    @app.context_processor
    def get_current_user():
        return {"consts": consts}

    return app


def create_dirs(app):
    LOG_PATH = app.config.get("LOG_PATH")
    if LOG_PATH == "":
        print("ERROR : please set the log path variable")
    if not os.path.exists(LOG_PATH):
        os.mkdir(LOG_PATH)


def register_extensions(app):
    """Register Flask extensions."""
    db.init_app(app)
    rna_log.init_app(app)
    csrf_protect.init_app(app)
    migrate.init_app(app, db)
    babel.init_app(app)
    if app.config["config_name"] == "development":
        app.config["UPLOADS_DEFAULT_DEST"] = os.path.join(app.static_folder, "uploads")
        app.config["UPLOADS_DEFAULT_URL"] = "/static/uploads"
    from flask_app.flask_uploads import configure_uploads, patch_request_class
    configure_uploads(app, decisionsUploadSet)
    #patch_request_class(app, app.config["MAX_CONTENT_LENGTH"])
    from flask_app import models
    user_datastore = SQLAlchemyUserDatastore(db, models.User, models.Role)
    from .bp_account.forms import Login, ChangePassword
    security.init_app(app, user_datastore, login_form=Login, change_password_form=ChangePassword)
    return None


def register_blueprints(app):
    """Register Flask blueprints."""
    from .bp_dashboard import bp_dashboard
    app.register_blueprint(bp_dashboard)
    from .bp_decision import bp_decision
    app.register_blueprint(bp_decision)
    from .bp_account import bp_account
    app.register_blueprint(bp_account)
    from .bp_progress import bp_progress
    app.register_blueprint(bp_progress)
    from .bp_map import bp_map
    app.register_blueprint(bp_map)
    return None