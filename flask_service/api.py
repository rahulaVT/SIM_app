from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
# cors = CORS(app, resources={r"/foo": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/run', methods=['POST'])
def fetchAttacks():
    import json
    import runSimulation as rs
    data = request.json
    obj = rs.RunSim()
    return jsonify(obj.main(data))

@app.route('/display', methods=['POST'])
def transformAttacks():
    import json
    import runSimulation as rs
    data = request.json
    obj = rs.RunSim()
    return jsonify(obj.tranformAttackPaths(data['graph'],data['attacks']))
app.run()
