''' controller and routes for users '''
import os
from flask import request, jsonify
from app import app, mongo
import logger
import datetime

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

@app.route('/getcandidate', methods=['POST'])
def get_candidates():
  data = request.get_json()
  output = mongo.db.candidates.find_one({"email": data["email"]})
  return jsonify(output)

@app.route('/schedule', methods=['POST'])
def insert_resume():
    data = request.get_json()
    e = request.form['email']
    resume = request.files['resume']
    mongo.save_file(resume.filename, resume)
    mongo.db.candidates.update_one({'email': e }, {"$set": {"resume": resume.filename, "date": datetime.datetime.utcnow(), "status" : "scheduled"} })
    return jsonify({'success': 'success', 'message': 'Inserted successfully!'}), 200
