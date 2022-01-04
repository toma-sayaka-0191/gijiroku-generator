import os
from flask import Flask, jsonify, abort, make_response, render_template, request

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/get', methods=['GET'])
def get():
    result = ""
    return result

@app.route('/post', methods=['POST'])
def post():
    result = request.form["param"]
    return make_response(result)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)