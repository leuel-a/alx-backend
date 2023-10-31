#!/usr/bin/env python3
"""Basic Flask App With Flask Babel"""
from flask import Flask, render_template, request
from flask_babel import Babel, gettext


class Config:
    """Config for all Babel Instance"""
    LANGUAGES = ['en', 'fr']

    # Set the default_locale and the timezone
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """Gets the locale from the request"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def index() -> str:
    """Home Page for the Application"""
    home_title = gettext('Welcome to Holberton')
    home_header = gettext('Hello world!')
    return render_template(
        '3-index.html',
        home_title=home_title,
        home_header=home_header
    )


if __name__ == '__main__':
    app.run()
