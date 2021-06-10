import os
import glob
# from flask_app import create_app
import subprocess

os.chdir(os.path.join(os.path.dirname(os.path.realpath(__file__)), "sqls"))

files = sorted(glob.glob("*.sql"))

for file in files:
    db_connection_string = "postgresql://postgres:postgres@localhost:5432"
    cmd = "psql "+ " -f " + file + " " + db_connection_string
    resp = subprocess.check_output(cmd, stderr=subprocess.STDOUT, shell=True)
    # print(file)
    print(resp.decode('ISO-8859-1'))