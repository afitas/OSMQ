import os
import sys
sys.path.insert(0, '/home/adminrna/rna/server_rna')


from flask_app import create_app

application = create_app("production")