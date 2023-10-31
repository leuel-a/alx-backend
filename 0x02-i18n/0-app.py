#!/usr/bin/env python3
"""Basic Flask App"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/', strict_slashes=False)
def home() -> None:
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(debug=True)
