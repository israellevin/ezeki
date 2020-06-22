'CORS proxy for github API.'
import os

import flask
import flask_cors
import requests

app = flask.Flask('ezeki')
app.config['SECRET_KEY'] = os.urandom(24)
flask_cors.CORS(app, resources={'*': {'origins': '*'}})


@app.route('/')
@app.route('/<path:path>', methods=['GET'])
def catch_all_handler(path=''):
    'Get contents from github api.'
    return flask.Response(requests.get(
        f"https://api.github.com/repos/israellevin/ezeki/contents/{path}").text, mimetype='application/json')
