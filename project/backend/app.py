from flask import Flask, jsonify, request
from PresentationAssistant import PresentationAssistant
from PresentationAnalyzer import PresentationAnalyzer
from database.UserDataManager import UserDataManager
from flask_cors import CORS, cross_origin

transcript = [""]

#user credentials
user_id = [None]
username = [None]
presentation_assistant = None
presentation_analyzer = None


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

@app.route('/startPresentation', methods = ['GET'])
@cross_origin()
def start_presentation():
    if request.method == 'GET':
        #TODO add presentation name screen
        #presentation_name = username = request.json["presentation_name"]
        presentation_assistant = PresentationAssistant(user_id, "testPresentation1")
        presentation_assistant.initiate_presentation()
    return ""

@app.route('/getTokens', methods = ['GET'])    
@cross_origin()
def get_tokens():
    if request.method == 'GET':
        a = jsonify(presentation_assistant)
        return a
    return ""

@app.route('/endPresentation', methods = ['GET'])
@cross_origin()
def end_presentation():
    if request.method == 'GET' and presentation_assistant:
        presentation_assistant.end_presentation()
    return ""

@app.route('/getFaceDetectionFlag', methods = ['GET'])
@cross_origin()
def get_face_detection_flag():
    if presentation_assistant and presentation_assistant.fd_flags:
        return jsonify(presentation_assistant.fd_flags)
    return ""       

            
@app.route('/getDecibelFlag', methods = ['GET'])
@cross_origin()
def get_decibel_flag():
    if presentation_assistant and presentation_assistant.vc_db_list:
        return jsonify(presentation_assistant.vc_db_list[-1])
    return ""


@app.route('/getTranscript', methods = ['GET'])
@cross_origin()
def get_transcript():
    # todo add live transcript
    #if presentation_assistant.vc_db_list:
    #    return jsonify(presentation_assistant.vc_db_list)
    return ""

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

    

if __name__ == "__main__":
    app.run(host='localhost', port=5000)


