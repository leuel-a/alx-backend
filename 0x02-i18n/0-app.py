#!/usr/bin/env python3
"""Basic Flask App"""
from flask import Flask, render_template

app = Flask()

@app.route('/', strict_slashes=False)
def home() -> None:
    return render_template('0-index.html')

