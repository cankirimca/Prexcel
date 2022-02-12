from threading import Thread

queue = []

def add_element():
    queue.append('can')

def read_element():
    str = queue.pop(0) 
    print(str)

thread = Thread(target = add_element)
thread2 = Thread(target = read_element)      

thread.start()
thread2.start()
