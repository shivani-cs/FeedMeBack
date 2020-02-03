''' controller and routes for users '''
import os
from flask import request, jsonify
from app import app, mongo
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

@app.route('/getInterviewerDetails', methods=['POST'])  #not working
def get_all_interviewers():
  data = request.get_json()
  candidates = mongo.db.candidates
  interviewers = mongo.db.interviewers
  output = []
  candidate = mongo.db.candidates.find({"intervieweremail" : data['email']})
  for c in candidate:
    output.append({'name' : c['name'], 'email': c['email'], 'jobid' : c['jobid'], 'status': c['status']})
  return jsonify({'candidates' : output})     

@app.route('/getQuestions', methods=['POST'])
def get_questions():
  data = request.get_json()
  candidates=mongo.db.candidates
  jobs = mongo.db.jobs
  output = []
  for c in candidates.find():
    if (data['email'] == c['email']) :
      for j in jobs.find():
        if (c['jobid'] == j['jobid']) : 
          output.append({'skills': j['skills']})
  return jsonify({'result' : output})   

@app.route('/SubmitAnswers', methods = ['POST'])
def submit():
    data = request.get_json()
    mongo.db.candidates.update_one({"email" : data["email"]}, {"$set" : {"answers" : data["answers"] }})
    return jsonify({'success': 'success', 'message': 'Inserted successfully!'}), 200
