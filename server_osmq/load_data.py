import os
import glob
from flask_app import create_app
import subprocess

app = create_app("development")

os.chdir(app.config["DATA_FOLDER"])

files = sorted(glob.glob("*.sql"))

for file in files:
    db_connection_string = app.config["SQLALCHEMY_DATABASE_URI"]
    cmd = "psql "+ " -f " + file + " " + db_connection_string
    resp = subprocess.check_output(cmd, stderr=subprocess.STDOUT, shell=True)
    print(file)
    print(resp.decode("utf-8"))