set FLASK_CONFIG=development
set FLASK_APP=run.py

if not exist "migrations"  flask db init
flask db migrate
flask db upgrade