import os

from flask_app import create_app

config_name = os.getenv('FLASK_CONFIG')
app = create_app(config_name)

if __name__ == '__main__':
    # app.run("127.0.0.1", port=5000, ssl_context=('cert.pem', 'key.pem'), debug=True)
    app.run("127.0.0.1", port=5000, debug=True)

