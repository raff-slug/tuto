'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Text, Card, Image, Suggestion, Payload} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

// Wikipedia link and image URLs


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Welcome to Tuto: the fraction tutor!`);
    
    agent.add(`I can multiply fractions! What do you want to multiply?`);
    agent.add(new Suggestion(`1/2 into 2/3`));
    agent.add(new Suggestion(`5/6 * 7/8`));
    agent.add(new Suggestion(`Cancel`));
  }

  function multiply(agent) {
    // Get parameters from Dialogflow to convert
    const num1 = Number(agent.parameters.numerator);
    const num2 = Number(agent.parameters.numerator1);
    const den1 = Number(agent.parameters.denominator);
    const den2 = Number(agent.parameters.denominator1);
    console.log(`User requested to multiply ${num1}/${den1} * ${num2}/${den2}`);

    let resultNum, resultDen;
    resultNum = num1*num2;
    resultDen = den1*den2;
    

    
    
    // Compile and send response
    agent.add(`The answer is = ${resultNum} / ${resultDen}`);
    
  }

  

  function fallback(agent) {
    agent.add(`Woah! Are you sure you put it in fraction?`);
    agent.add(`I didn't get that, can you try again?`);
  }

  let intentMap = new Map(); // Map functions to Dialogflow intent names
  intentMap.set('TutoWelcome', welcome);
  intentMap.set('fractionMultiplier', multiply);
  
  agent.handleRequest(intentMap);
});
