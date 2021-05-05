pybabel extract -F babel.cfg -k _l -o messages.pot .
pybabel update -i messages.pot -d flask_app/translations
pybabel compile -d flask_app/translations