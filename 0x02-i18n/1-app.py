#!/usr/bin/env python3
"""Basic Flask App With Flask Babel"""
from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config:
    """Config for all Babel Instance"""
    LANGUAGES = ['en', 'fr']

    # Set the default_locale and the timezone
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@app.route('/', strict_slashes=False)
def index() -> str:
    """Home Page for the Application"""
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run()
