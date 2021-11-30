#db instance identifier: prexcel
#username: admin
#password: prexcel123
#host: prexcel.clrzpgynpipe.eu-central-1.rds.amazonaws.com
#port: 3306

import pymysql

instance_name = "prexcel"
username = "admin"
db_password = "prexcel123"
hostname = "prexcel.clrzpgynpipe.eu-central-1.rds.amazonaws.com"
port = "3306"

class UserDataManager:
    def __init__(self):
        self.connection = pymysql.connect(host = hostname, user = username, password = db_password)
        self.cursor = self.connection.cursor()
        use_database = '''use prexcel'''
        self.cursor.execute(use_database)

    def get_user_name(self, user_id):
        self.cursor.execute("SELECT username FROM user WHERE user_id = %s", user_id)
        return self.cursor.fetchone()[0]

    def get_presentation_name(self, presentation_id):
        self.cursor.execute("SELECT presentation_name FROM Presentation WHERE presentation_id = %s", presentation_id)
        return self.cursor.fetchone()[0]

    def get_transcript(self, presentation_id):
        self.cursor.execute("SELECT transcript FROM Presentation WHERE presentation_id = %s", presentation_id)
        return self.cursor.fetchone()[0]

    def get_presentation_id(self, presentation_id):
        self.cursor.execute("SELECT presentation_id FROM Presentation WHERE presentation_id = %s", presentation_id)
        return self.cursor.fetchone()[0]

    def delete_presentation(self, presentation_id):
        self.cursor.execute("DELETE FROM Presentation WHERE presentation_id = %s", presentation_id)
        return self.cursor.fetchone()[0]

    def update_presentation_name(self, presentation_id, updated_presentation_name):
        self.cursor.execute("UPDATE Presentation SET presentation_name = '%s' WHERE presentation_id = %s", updated_presentation_name, presentation_id)
        return self.cursor.fetchone()[0]

    def update_transcipt(self, presentation_id, updated_transcript):
        self.cursor.execute("UPDATE Presentation SET transcript = '%s' WHERE presentation_id = %s", updated_transcript, presentation_id)
        return self.cursor.fetchone()[0]

    #create_database = '''create database prexcel'''
    #cursor.execute(create_database)


    #cursor.execute('''CREATE TABLE user (username VARCHAR(255), password VARCHAR(255), mail_address VARCHAR(255))''')
    #cursor.execute('''INSERT INTO user VALUES("john_smith", "js123", "johnsmith@mail.com")''')

    #cursor.execute('''SELECT password FROM user WHERE mail_address = 'johnsmith@mail.com' ''')
    #print(cursor.fetchall())
    #db.commit()

udm = UserDataManager()
username = udm.get_user_name(678213)
print("username:",username)
