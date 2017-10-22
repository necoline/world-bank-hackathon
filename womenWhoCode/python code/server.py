from flask import Flask, render_template, request, session, flash, redirect, jsonify, json, Response
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/dataUSA")
def hello():
    data = { "2001" : 1.4 ,"2002" : 2.3 , "2006": 3}
    #return jsonify(data)
    resp = Response(json.dumps(data))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp

if __name__ == "__main__":
    app.run()