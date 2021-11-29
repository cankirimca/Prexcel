#db instance identifier: prexcel
#username: admin
#password: prexcel123
#host: prexcel.clrzpgynpipe.eu-central-1.rds.amazonaws.com
#port: 3306

import pymysql

instance_name = "prexcel"
username = "admin"
password = "prexcel123"
hostname = "prexcel.clrzpgynpipe.eu-central-1.rds.amazonaws.com"
port = "3306"

pymysql.connect(hostname, username, password)
print("can")