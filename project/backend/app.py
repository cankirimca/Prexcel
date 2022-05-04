from flask import Flask, jsonify, request
from PresentationAssistant import PresentationAssistant
from PresentationAnalyzer import PresentationAnalyzer
from database.UserDataManager import UserDataManager
from flask_cors import CORS, cross_origin

from project.backend.word_recommendation.WordRecommender import WordRecommender

transcript = [""]

#user credentials
user_id = [None]
username = [None]
presentation_assistant = None
presentation_analyzer = None
word_recommender = None


app = Flask(__name__)
print("can")
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#set user info after login
def initiate_user_info(id, name):
    user_id[0] = id
    username[0] = name

@app.route('/', methods = ['GET'])
def get_articles():
    return jsonify({"Hello":"World"})

@app.route('/getPresentations', methods = ['POST'])
@cross_origin()
def get_presentations():
    if request.method == 'POST':
        ud = UserDataManager()
        user_id = request.json["userID"]
        columns = ud.get_presentations_for_user(user_id)
    return jsonify(list(columns))

@app.route('/register', methods = ['POST'])
@cross_origin()
def register_user():
    if request.method == 'POST':
        ud = UserDataManager()
        username = request.json["username"]
        email = request.json["email"]
        password = request.json["password"]
        ud.register_user(username, password, email)      

@app.route('/login', methods = ['POST'])
@cross_origin()
def get_user():
    if request.method == 'POST':
        ud = UserDataManager()
        username = request.json["username"]
        password = request.json["password"]
        try:
            user_id = ud.login(username, password)
            initiate_user_info(user_id, username)  
            return jsonify(user_id)
        except TypeError:
            return jsonify(-1) #indicates error

@app.route('/startPresentation', methods = ['POST'])
@cross_origin()
def start_presentation():
    try:
        if request.method == 'POST':
            #TODO add presentation name screen
            #presentation_name = username = request.json["presentation_name"]
            global presentation_assistant
            presentation_name = request.json["presentation_name"] 
            presentation_assistant = PresentationAssistant(user_id, presentation_name)
            print("pa created outer")
            presentation_assistant.initiate_presentation()
        return jsonify("")
    except Exception as e:
        print("exception") 
        print(str(e))    

"""@app.route('/getTokens', methods = ['GET'])    
@cross_origin()
def get_tokens():
    if request.method == 'GET':
        global presentation_assistant
        a = jsonify(presentation_assistant)
        return a
    return jsonify("")"""

@app.route('/endPresentation', methods = ['GET'])
@cross_origin()
def end_presentation():
    try:
        global presentation_assistant
        if request.method == 'GET' and (presentation_assistant != None):
            presentation_assistant.end_presentation()
            print("in app, presentation ended")
        return jsonify("Presentation Ended")
    except Exception as e:
        print("exception") 
        print(str(e))    

@app.route('/getFaceDetectionFlag', methods = ['GET'])
@cross_origin()
def get_face_detection_flag():
    global presentation_assistant
    if (presentation_assistant != None) and (presentation_assistant.fd_flags != None) and len(presentation_assistant.fd_flags) > 0:
        print( jsonify(presentation_assistant.fd_flags[-1]))
        return jsonify(presentation_assistant.fd_flags[-1])
    return jsonify("")     

@app.route('/getRecommendations', methods = ['GET'])
@cross_origin()
def get_recommendations():
    global presentation_assistant
    #print(presentation_assistant)
    if (presentation_assistant != None) and len(presentation_assistant.recommendations) > 0:
        print("----------------posted-----------------")
        return jsonify(presentation_assistant.recommendations[-1])
    return jsonify("")          

            
@app.route('/getDecibelFlag', methods = ['GET'])
@cross_origin()
def get_decibel_flag():
    global presentation_assistant
    if (presentation_assistant != None) and presentation_assistant.vc_db_list:
        return jsonify(presentation_assistant.vc_db_list[-1])
    return jsonify("")


@app.route('/getTranscript', methods = ['GET'])
@cross_origin()
def get_transcript():
    # todo add live transcript
    if (presentation_assistant != None) and (presentation_assistant.transcript[0] != None):
        return jsonify(presentation_assistant.transcript[0])
    return jsonify("")

@app.route('/processUploadedPresentation', methods = ['POST'])
@cross_origin()
def process_upload():
    try:    
        file_path = request.json["path"]
        print("path:", file_path)
        file_path = file_path.replace("\\", "/")
        print("path:", file_path)
        presentation_name = request.json["presentation_name"]  
        pa = PresentationAnalyzer(user_id, presentation_name, file_path)
        pa.process_recording()
        return "Processing successful, you may now view the report."
    except:
        return "An error occured during the processing. Please try again."   

@app.route('/getUserInfo', methods = ['GET'])
@cross_origin()
def get_user_info():
    ud = UserDataManager()
    info = ud.get_user_info(user_id[0])[0]
    return jsonify(info)

if __name__ == "__main__":
    app.run(host='localhost', port=5000)
    print("Ended app")


