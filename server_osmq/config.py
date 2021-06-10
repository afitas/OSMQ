import os 


class Config(object):
    """
    Common configurations
    """
    # Put any configurations here that are common across all environments
    BABEL_DEFAULT_LOCALE = 'ar'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SERVER_NAME = '127.0.0.1:5000'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
    DATA_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), "sqls")
    SECURITY_LOGIN_URL = "/account/login"
    SECURITY_USER_IDENTITY_ATTRIBUTES = ['username']
    SECURITY_POST_LOGIN_VIEW = "/"
    SECURITY_POST_LOGOUT_VIEW = "/"
    SECURITY_CHANGEABLE = True
    SECURITY_SEND_PASSWORD_CHANGE_EMAIL = False
    SECURITY_FLASH_MESSAGES = False
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024   # 5mb # TODO Test when deploying
    LOG_PATH = "logs/"

    SECURITY_MSG_INVALID_PASSWORD = ("اسم المستخدم أو كلمة السر خاطئة", "error")
    SECURITY_MSG_PASSWORD_NOT_PROVIDED = ("اسم المستخدم أو كلمة السر خاطئة", "error")
    SECURITY_MSG_USER_DOES_NOT_EXIST = ("اسم المستخدم أو كلمة السر خاطئة", "error")    

class DevelopmentConfig(Config):
    """
    Development configurations
    """
    DEBUG = True
    SECRET_KEY = "153asd@sa484-/*-+-dasdg*//<*ù^$*/*-46a8d"
    SECURITY_PASSWORD_HASH = "sha512_crypt"
    SECURITY_PASSWORD_SALT = "sa484-/s*153a-d^$*/+dsd*-48d@-6ag*/a/<*ù"
    # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:admin@localhost:5432/rna'
    
    SQLALCHEMY_ECHO = False


class ProductionConfig(Config):
    """
    Production configurations
    """
    UPLOADS_DEFAULT_DEST = "uploads"
    UPLOADS_DEFAULT_URL = "/uploads"
    #SQLALCHEMY_ECHO = False
    #DEBUG = False


app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
