// Initlalizing elements
let submitButton = document.getElementById("submitButton");
let promptInput = document.getElementById("promptInput");
let responsesContainer = document.getElementsByClassName("responses-container")[0];
let loader = document.getElementById("submissionLoader");
let clearButton = document.getElementById("clearButton");
let responses = [];

// Turns submit button into loader and begins the response process
submitButton.onclick = function () {
    console.log("Fetching response...")
    submitButton.style.display = "none";
    loader.style.display = "block";
    getTextFromPrompt(promptInput.value);
}

clearButton.onclick = function () {
    clearPreviousResponses()
}

// Fetches a response from a prompt and calls addResponseToList when it gets a response 
function getTextFromPrompt(userPrompt) {
    const data = {
        prompt: userPrompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            submitButton.style.display = "block";
            loader.style.display = "none";
            addResponseToList(userPrompt, data.choices[0].text)
            saveResponse({ prompt: userPrompt, response: data.choices[0].text })
        });
}

// Creates a response element with the prompt and response data, then appends the element to the response container
function addResponseToList(userPrompt, openAiResponse) {
    let responseDiv = document.createElement('div');
    responseDiv.classList.add('response');

    let promptHeader = document.createElement('h3');
    let promptHeaderText = document.createTextNode("Prompt");
    promptHeader.appendChild(promptHeaderText);

    let prompt = document.createElement('p');
    let promptText = document.createTextNode(userPrompt);
    prompt.appendChild(promptText);

    let responseHeader = document.createElement('h3');
    let responseHeaderText = document.createTextNode("Response");
    responseHeader.appendChild(responseHeaderText);

    let response = document.createElement('p');
    let responseText = document.createTextNode(openAiResponse);
    response.appendChild(responseText);

    responseDiv.appendChild(promptHeader);
    responseDiv.appendChild(prompt);
    responseDiv.appendChild(responseHeader);
    responseDiv.appendChild(response);

    responsesContainer.prepend(responseDiv);
    clearButton.style.display = "block";
}

// Saves a response to local storage
function saveResponse(responseObj) {
    responses.push(responseObj)
    localStorage.setItem("responses", JSON.stringify(responses))
    console.log(JSON.parse(localStorage.getItem("responses")))
}

// Onload it will check if the localstoage has any responses saved that it should load
window.addEventListener('load', (event) => {
    try {
        let loadedResponses = JSON.parse(localStorage.getItem("responses"));

        for (let i = 0; i < loadedResponses.length; i++) {
            addResponseToList(loadedResponses[i].prompt, loadedResponses[i].response)
            responses.push(loadedResponses[i]);
        }

        clearButton.style.display = "block";
        console.log('loaded previous responses');
    }
    catch (err) {
        clearButton.style.display = "none";
        console.log("No previous responses")
    }
});

// Clears all previous responses from local storage and the current session
function clearPreviousResponses() {
    clearButton.style.display = "none";
    responsesContainer.innerHTML = "";
    responses = [];
    localStorage.setItem("responses", null)
}