import logging
import os
import sys
from datetime import datetime
from time import strftime
from flask import abort, current_app, request
import traceback
from werkzeug.exceptions import InternalServerError
from logging.handlers import RotatingFileHandler


class RnaLogExtention:
    LOG_PATH = ""
    error_log = logging.Logger("error_log", level=logging.ERROR)
    warning_log = logging.Logger("warning_log", level=logging.WARNING)
    info_log = logging.Logger("info_log", level=logging.INFO)
    critical_log = logging.Logger("critical_log", level=logging.CRITICAL)
    debug_log = logging.Logger("debug_log", level=logging.DEBUG)

    def init_app(self, app):
        self.LOG_PATH = app.config.get("LOG_PATH")

        self.error_log.addHandler(logging.FileHandler(
            filename=os.path.join(self.LOG_PATH, 'error.log')))
        self.warning_log.addHandler(logging.FileHandler(
            filename=os.path.join(self.LOG_PATH, 'warning.log')))
        self.info_log.addHandler(logging.FileHandler(
            filename=os.path.join(self.LOG_PATH, 'info.log')))
        self.critical_log.addHandler(logging.FileHandler(
            filename=os.path.join(self.LOG_PATH, 'critical.log')))
        self.debug_log.addHandler(logging.FileHandler(
            filename=os.path.join(self.LOG_PATH, 'debug.log')))

        handler = RotatingFileHandler(
            os.path.join(self.LOG_PATH, 'main.log'),
            'a',
            maxBytes=1024 * 1024 * 100,
            backupCount=5
        )
        log_werkzeug = logging.getLogger('werkzeug')
        log_werkzeug.setLevel(logging.INFO)
        log_werkzeug.addHandler(handler)
        log_werkzeug.addHandler(logging.StreamHandler(sys.stdout))
    
        @app.after_request
        def after_request(response):
            timestamp = strftime('[%Y-%b-%d %H:%M]')
            log_werkzeug.info('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status)
            return response
        
        @app.errorhandler(InternalServerError)
        def handle_500(e):
            self.log("critical", traceback.format_exc())
            return "آسف حدث خطأ أثناء معالجة طلبك ، يرجى الاتصال بالدعم الفني", 500

    def log(self, level, msg):

        if self.LOG_PATH == "":
            raise InternalServerError(
                "log path not initiated, please check your configuration")
        if level == "error":
            self.error_log.error(str(datetime.now()) + " " + msg)
        elif level == "warning":
            self.warning_log.warning(str(datetime.now()) + " " + msg)
        elif level == "info":
            self.info_log.info(str(datetime.now()) + " " + msg)
        elif level == "critical":
            self.critical_log.critical(str(datetime.now()) + " " + msg)
        elif level == "debug":
            self.debug_log.debug(str(datetime.now()) + " " + msg)
        else:
            self.critical_log.critical(str(datetime.now()) +
                                       " The log_() function can't be used by the following level: {level}".format(level=level))
