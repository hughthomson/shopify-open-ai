let submitButton = document.getElementById("submitButton");
let promptInput = document.getElementById("promptInput");
let responsesContainer = document.getElementsByClassName("responses-container")[0];

submitButton.onclick = function () {
    console.log("Test")
    getTextFromPrompt(promptInput.value);
}

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

function addResponseToList(userPrompt, openAiResponse) {
    let responseDiv = document.createElement('div');
    responseDiv.classList.add('response');

    let prompt = document.createElement('p');
    let promptText = document.createTextNode("Prompt: " + userPrompt);
    prompt.appendChild(promptText);

    let response = document.createElement('p');
    let responseText = document.createTextNode("Response: " + openAiResponse);
    response.appendChild(responseText);

    responseDiv.appendChild(prompt);
    responseDiv.appendChild(response);

    responsesContainer.appendChild(responseDiv);
}