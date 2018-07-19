
# coding: utf-8

# In[1]:

from bottle import Bottle, run
from bottle import route
from bottle import get, post, request, response

import json
import logging

import dialogue_manager
import plan_checker


# In[2]:

logging.basicConfig(filename = 'chatbots4edu.log', level = logging.DEBUG)
logging.info("The server is coming up.")


# In[3]:

app = Bottle()
# instantiate other services like db etc.


# In[4]:

@app.route('/greeting', method = 'POST')
def greeting():
    # TODO: make sure user is authorized
    greeting = dialogue_manager.get_greeting()
    response.headers['Content-Type'] = 'application/json'
    return json.dumps({ 'greeting': greeting })


# In[5]:

@app.route('/chat_describe_solution', method = 'POST')
def chat_describe_solution():
    # TODO: make sure the user is authorized
    reply = dialogue_manager.get_reply() # should pass context from the post
    response.headers['Content-Type'] = 'application/json'
    return json.dumps({ 'reply': reply })


# In[6]:

@app.route('/review_solution', method = 'POST')
def review_solution():
    # TODO: make sure the user is authorized
    feedback = plan_checker.review_solution() # TODO pass info from the post
    response.headers['Content-Type'] = 'application/json'
    return json.dumps({ 'feedback': feedback })    


# In[ ]:

run(app, host = 'localhost', port = 8080, debug = True)


# In[ ]:




# In[ ]:



