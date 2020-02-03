''' controller and routes for admin '''
import os
from flask import request, jsonify, url_for
from app import app, mongo
import logger
from bson.json_util import dumps, loads, Binary
import urllib.request as url
import base64
import codecs

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

@app.route('/login', methods=['POST'])
def get_all_login():
  data = request.get_json()
  if (data['usertype'] == 'student') :
    check = mongo.db.candidates.find({'email' : data['email']}).count()
    if check == 0 :
      return jsonify({'success': 'failure', 'msg': 'Invalid Candidate'})
    else :
      mongo.db.candidates.update_one({'email': data['email']}, {"$set": {"gender": data["gender"]}})
      return jsonify({'success' : "Success", 'message' : "successfull login!", 'email': data['email'], 'usertype':'student'}),200   
  elif (data['usertype'] == 'admin') :
    check = mongo.db.admin.find({'email' : data['email']}).count()
    if check == 0 :
      mongo.db.admin.insert_one(data)
    return jsonify({'success' : "Success", 'message' : "successfull login!", 'name' : data['name'], 'email': data['email'], 'usertype':'admin'}),200
  else :
    check = mongo.db.interviewers.find({'email' : data['email']}).count()
    if check == 0 :
      mongo.db.interviewers.insert_one(data)
    return jsonify({'success' : "Success", 'message' : "successfull login!", 'name' : data['name'], 'email': data['email'], 'usertype':'interviewer'}),200
  
@app.route('/getPositionDetails', methods=['GET'])
def get_all_positions():
  jobs = mongo.db.jobs
  output = []
  for c in jobs.find():
      output.append({'name' : c['name'], 'desc' : c['desc'], 'skills': c['skills'], 'jobid': c['jobid']})
  return jsonify({'positions' : output}) 

@app.route('/getCandidateDetails', methods=['POST']) #Not working now idk why??
def get_all_candidates():
  data = request.get_json()
  candidates = mongo.db.candidates
  output = []
  for c in candidates.find():
    if (data['jobid'] == c['jobid']) :
      output.append({'name' : c['name'], 'email': c['email'], 'status': c['status']})
  return jsonify({'candidates' : output})     

@app.route('/scheduleInterview', methods=['POST'])  
def schedule_interview():
  data = request.get_json()
  job = mongo.db.jobs.find_one({"name": data["position"]})
  mongo.db.candidates.insert_one({"email": data["email"], "name": data["name"], "jobid": job["jobid"],"position":data["position"],"status": "pending"})
  return jsonify({'success' : "Success", 'message' : "interview request sent!"})
  
@app.route('/assignInterviewer', methods=['POST'])
def assign_interviewer(): 
  data = request.get_json()
  candidates = mongo.db.candidates
  mongo.db.candidates.update_one({'email': data['email']}, {"$set": {"intervieweremail": data["intervieweremail"]}})
  return jsonify({'success' : "Success", 'message' : "interviewer assigned!"})    


