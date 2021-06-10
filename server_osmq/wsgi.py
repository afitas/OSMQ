import os
import sys
from flask_app import create_app as app

if __name__ == "__main__":
    app("production").run()