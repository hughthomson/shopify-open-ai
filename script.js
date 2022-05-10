// Initlalizing elements
let submitButton = document.getElementById("submitButton");
let promptInput = document.getElementById("promptInput");
let responsesContainer = document.getElementsByClassName("responses-container")[0];

submitButton.onclick = function () {
    console.log("Fetching response...")
    getTextFromPrompt(promptInput.value);
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
            addResponseToList(userPrompt, data.choices[0].text)
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
}