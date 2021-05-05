# -*- coding: utf-8 -*-
"""Extensions module. Each extension is initialized in the app factory located in app.py."""
from flask_security import Security
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_babel import Babel
from flask_app.flask_uploads import UploadSet
from flask_app.log import RnaLogExtention


csrf_protect = CSRFProtect()
db = SQLAlchemy()
security = Security()
migrate = Migrate()
babel = Babel()
rna_log = RnaLogExtention()
decisionsUploadSet = UploadSet("decisionsUploadSet", ["pdf"])