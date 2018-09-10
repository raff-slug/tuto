$(document).ready(function() {
    // Inject the chatbot form into the right spot in the page. 
    theDiv = $('div.mainContent_120drhm:first'); // Position in KA page 
    newDiv = document.createElement('div');
    newForm = document.createElement('form');
    newTextArea = document.createElement('textarea');
    newTextArea.setAttribute('cols', '100');
    newTextArea.setAttribute('rows', '10');
    newTextArea.setAttribute('disabled', true);
    newTextArea.textContent = getGreeting();
    newForm.appendChild(newTextArea);
    newDiv.appendChild(newForm);
    theDiv.prepend(newDiv);
});

   /* TODO: Implement the other functionality.
    * When the user gets a problem wrong, disable retry and next problem
    * and popup the solution method context window.
    */

function getGreeting() {
    fromServer = emulateHttps('post', '/greeting'); 
	// TODO: pass something for identification/authentication 
	// TODO: replace with real server call after setting up ssl there 
    data = JSON.parse(fromServer);
    greeting = data.greeting;
    return greeting; 
}

/*
 * Since we aren't running real https yet and Khan Academy requires https,
 * mock up server response contents.
 */
function emulateHttps(method, path) {
    if (method == 'post' && path == '/greeting') {
        return JSON.stringify({ "greeting": "I am the chatbot. DUN DUN DUNNN..." });
    }
}  

