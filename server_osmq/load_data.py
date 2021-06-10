import os
import glob
# from flask_app import create_app
import subprocess

os.chdir(os.path.join(os.path.dirname(os.path.realpath(__file__)), "sqls"))

files = sorted(glob.glob("*.sql"))

for file in files:
    db_connection_string = "postgres://covnvejvkzuipv:cbd81ce7f6ddb18d99b26270126c6faa1e6d77865d2ba53b9122ab78c3e11138@ec2-54-163-254-204.compute-1.amazonaws.com:5432"
    cmd = "psql "+ " -f " + file + " " + db_connection_string
    resp = subprocess.check_output(cmd, stderr=subprocess.STDOUT, shell=True)
    # print(file)
    print(resp.decode('ISO-8859-1'))