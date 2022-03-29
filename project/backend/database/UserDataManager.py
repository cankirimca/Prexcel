#db instance identifier: prexcel
#username: admin
#password: prexcel123
#host: prexcel.clrzpgynpipe.eu-central-1.rds.amazonaws.com
#port: 3306

import pymysql
from random import randint

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

    def add_presentation(self, presentation_name, transcript, user_id, wpm, duration, filler_ratio, word_count):
        presentation_id = randint(100000, 999999)
        self.cursor.execute("INSERT INTO Presentation (presentation_id, presentation_name, transcript, user_id, wpm, duration, gap_ratio, filler_ratio, word_count) VALUES(%d, %s, %s, %d, %f, %f, %f, %f, %d)", presentation_id, presentation_name, transcript, user_id, wpm, duration, gap_ratio, filler_ratio, word_count)    

    def login(self, username, password):
        self.cursor.execute("SELECT * FROM User WHERE username = %s AND password = %s", (username, password))
        return self.cursor.fetchone()[3]

    def register_user(self, username, password, mail_address):
        user_id = randint(100000, 999999)
        self.cursor.execute("INSERT INTO User (user_id, username, mail_address, password) VALUES(%s, %s, %s, %s)", (user_id, username, mail_address, password))
        self.connection.commit()

    def delete_user(self, user_id):
        self.cursor.execute("DELETE FROM User WHERE user_id = %d", user_id)
        self.connection.commit()

    def get_user_name(self, user_id):
        self.cursor.execute("SELECT username FROM User WHERE user_id = %s", user_id)
        return self.cursor.fetchall()

    def update_user_name(self, user_id, new_username):
        self.cursor.execute("UPDATE User SET username = '%s' WHERE user_id = %s", new_username, user_id)
        self.connection.commit()

    def update_password(self, user_id, new_password):
        self.cursor.execute("UPDATE User SET password = '%s' WHERE user_id = %s", new_password, user_id)
        self.connection.commit()

    def get_user_name(self, user_id):
        self.cursor.execute("SELECT password FROM User WHERE user_id = %s", user_id)
        return self.cursor.fetchone()[0]

    def get_presentation_name(self, presentation_id):
        self.cursor.execute("SELECT presentation_name FROM Presentation WHERE presentation_id = %s", presentation_id)
        return self.cursor.fetchone()[0]

    def get_presentations_for_user(self, user_id):
        self.cursor.execute("SELECT * FROM Presentation WHERE user_id = %s", user_id)
        return self.cursor.fetchall()   

    def get_transcript(self, presentation_id):
        self.cursor.execute("SELECT transcript FROM Presentation WHERE presentation_id = %s", presentation_id)
        return self.cursor.fetchone()[0]

    def get_presentation_id(self, presentation_id):
        self.cursor.execute("SELECT presentation_id FROM Presentation WHERE presentation_id = %s", presentation_id)
        return self.cursor.fetchone()[0]

    def delete_presentation(self, presentation_id):
        self.cursor.execute("DELETE FROM Presentation WHERE presentation_id = %s", presentation_id)
        self.connection.commit()

    def update_presentation_name(self, presentation_id, updated_presentation_name):
        self.cursor.execute("UPDATE Presentation SET presentation_name = '%s' WHERE presentation_id = %s", updated_presentation_name, presentation_id)
        self.connection.commit()

    def update_transcipt(self, presentation_id, updated_transcript):
        self.cursor.execute("UPDATE Presentation SET transcript = '%s' WHERE presentation_id = %s", updated_transcript, presentation_id)
        self.connection.commit()

    def get_statistics_id(self, statistics_id, user_id, presentation_id):
        self.cursor.execute("SELECT statistics_id FROM Statistics WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", statistics_id, user_id, presentation_id)
        self.connection.commit()

    def get_statistics_wpm(self, statistics_id, user_id, presentation_id):
        self.cursor.execute("SELECT wpm FROM Statistics WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", statistics_id, user_id, presentation_id)
        self.connection.commit()

    def get_statistics_duration(self, statistics_id, user_id, presentation_id):
        self.cursor.execute("SELECT duration FROM Statistics WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", statistics_id, user_id, presentation_id)
        self.connection.commit()

    def get_statistics_filler_duration(self, statistics_id, user_id, presentation_id):
        self.cursor.execute("SELECT filler_duration FROM Statistics WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", statistics_id, user_id, presentation_id)
        self.connection.commit()    

    def get_statistics_filler_count(self, statistics_id, user_id, presentation_id):
        self.cursor.execute("SELECT filler_count FROM Statistics WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", statistics_id, user_id, presentation_id)
        self.connection.commit()

    def update_wpm(self, statistics_id, presentation_id, user_id, new_wpm):
        self.cursor.execute("UPDATE Statistics SET wpm = '%s' WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", new_wpm, statistics_id, presentation_id, user_id)
        self.connection.commit()

    def update_duration(self, statistics_id, presentation_id, user_id, new_duration):
        self.cursor.execute("UPDATE Statistics SET duration = '%s' WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", new_duration, statistics_id, presentation_id, user_id)
        self.connection.commit()
    
    def update_filler_duration(self, statistics_id, presentation_id, user_id, new_filler_duration):
        self.cursor.execute("UPDATE Statistics SET filler_duration = '%s' WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", new_filler_duration, statistics_id, presentation_id, user_id)
        self.connection.commit()

    def update_filler_count(self, statistics_id, presentation_id, user_id, new_filler_count):
        self.cursor.execute("UPDATE Statistics SET filler_count = '%s' WHERE statistics_id = %s AND user_id = %s AND presentation_id = %s", new_filler_count, statistics_id, presentation_id, user_id)
        self.connection.commit()

    def delete_statistic(self, statistics_id, presentation_id, user_id):
        self.cursor.execute("DELETE FROM Statistics WHERE statistics_id = %s AND presentation_id = %s AND user_id = %s", statistics_id, presentation_id, user_id)
        self.connection.commit()

    #create_database = '''create database prexcel'''
    #cursor.execute(create_database)


    #cursor.execute('''CREATE TABLE user (username VARCHAR(255), password VARCHAR(255), mail_address VARCHAR(255))''')
    #cursor.execute('''INSERT INTO user VALUES("john_smith", "js123", "johnsmith@mail.com")''')

    #cursor.execute('''SELECT password FROM user WHERE mail_address = 'johnsmith@mail.com' ''')
    #print(cursor.fetchall())
    #db.commit()

udm = UserDataManager()
try:
    id = udm.login("flaskltry", "flasktrypass")
    print(id)
except TypeError:
    print("error")    


print("username:",username)
