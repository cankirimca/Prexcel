from flask import Flask, jsonify, request
from database.UserDataManager import UserDataManager
from flask_cors import CORS, cross_origin

app = Flask(__name__)
print("can")
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods = ['GET'])
def get_articles():
    return jsonify({"Hello":"World"})

@app.route('/getPresentations', methods = ['POST'])
@cross_origin()
def get_presentations():
    if request.method == 'POST':
        ud = UserDataManager()
        print("hehehbebebe")
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
        print("asdd")
        username = request.json["username"]
        password = request.json["password"]
        try:
            user_id = ud.login(username, password)  
            return jsonify(user_id)
        except TypeError:
            return jsonify(-1) #indicates error

                  

if __name__ == "__main__":
    app.run(host='localhost', port=5000)