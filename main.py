import flask
from flask import render_template, request
import json



app = flask.Flask(__name__, static_url_path='/static', static_folder='static/')


@app.route("/")
def hello():
    return render_template('index.html', title='Home')




if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)