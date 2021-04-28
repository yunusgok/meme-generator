import flask
from flask import render_template, request
import json
from image import  add_text_to_image

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = flask.Flask(__name__, static_url_path='/static', static_folder='static/')


@app.route("/")
def hello():
    user = {'username': 'Miguel'}
    return render_template('main.html', title='Home', user=user)


@app.route("/generate", methods=['GET', 'POST'])
def memeEnd():
    print("called")
    data = json.loads(request.data.decode("utf-8"))
    url = add_text_to_image(**data)
    print(url)
    print("ended")

    return url




if __name__ == "__main__":
    # Used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host="localhost", port=8080, debug=True)