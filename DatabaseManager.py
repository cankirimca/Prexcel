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

db = pymysql.connect(host = hostname, user = username, password = db_password)

cursor = db.cursor()
cursor.execute("select version()")
print(cursor.fetchone())

#create_database = '''create database prexcel'''
#cursor.execute(create_database)
use_database = '''use prexcel'''
cursor.execute(use_database)

#cursor.execute('''CREATE TABLE user (username VARCHAR(255), password VARCHAR(255), mail_address VARCHAR(255))''')
#cursor.execute('''INSERT INTO user VALUES("john_smith", "js123", "johnsmith@mail.com")''')

cursor.execute('''SELECT password FROM user WHERE mail_address = 'johnsmith@mail.com' ''')
print(cursor.fetchall())
