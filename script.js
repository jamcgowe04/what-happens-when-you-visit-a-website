
const urlInput = document.getElementById("urlInput");
const exploreButton = document.getElementById("exploreButton");

const journey = document.getElementById("journey");
const selectedUrl = document.getElementById("selectedUrl");

const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");

const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

const progressSteps = document.querySelectorAll(".progress-step");
const progressLines = document.querySelectorAll(".progress-line");

const urlFeedback = document.getElementById("urlFeedback");


const networkNodes = document.querySelectorAll(".network-node");
const connectionLines = document.querySelectorAll(".connection-line");
const networkVisual = document.querySelector(".network-visual");

const definitionBox = document.getElementById("definitionBox");
const definitionTitle = document.getElementById("definitionTitle");
const definitionText = document.getElementById("definitionText");
const closeDefinition = document.getElementById("closeDefinition");

let currentStage = 0;
let completionMessage = null;

const definitions = {
    DNS: "DNS stands for Domain Name System. It helps translate a website's domain name, such as example.com, into an IP address that computers use to locate the server.",
    
    "IP Address": "An IP address is a numerical address used to identify a device or server on a network. It helps your browser find where a website is hosted.",
    
    HTTP: "HTTP stands for Hypertext Transfer Protocol. It defines how a browser and web server communicate when requesting and delivering web resources.",
    
    HTTPS: "HTTPS is the secure version of HTTP. It uses encryption to help protect information exchanged between your browser and a website.",
    
    HTML: "HTML stands for HyperText Markup Language. It provides the structure and content of a webpage.",
    
    CSS: "CSS stands for Cascading Style Sheets. It controls how webpage content looks, including layout, colors, fonts, and spacing.",
    
    JavaScript: "JavaScript is a programming language commonly used to add interactive behavior and dynamic functionality to webpages."
};

function showDefinition(term) {

    if (!definitions[term]) {
        return;
    }

    definitionTitle.textContent = term;
    definitionText.textContent = definitions[term];

    definitionBox.classList.remove("hidden");
}

closeDefinition.addEventListener("click", function () {
    definitionBox.classList.add("hidden");
});

const stages = [
    {
        title: " 1st Step: Entering a URL",
        description:
            "When entering a website address, your web browser reads the URL to determine which website is being requested to visit. URL stands for Uniform Resource Locator. This is used to find a specific page, file, or resource on the interent.", 
        example:
            "Think of a URL as a maling address. The domain identifies the website, while the path can point to a specific page or resource within it."
    },
    {
        title: "2nd Step: Finding the Server",
        description:
            "The next thing a web browser will need is an IP address in order to locate the server where the website is being hosted. DNS, or the Domain Name System, helps translate a human-readable domain name into an IP address.",
        example:
            "DNS works like a contact list on your phone. Instead of remebering a long number, you use a name, and the system helps find the number associated with it."
    },
    {
        title: "3rd Step: Establishing a Connection",
        description:
            "Once the browser has obtained an IP address, it can now communicate with the server. For HTTPS websites, the browser and server also establish encryption so information can be transmitted securely.",
        example:
            "Imagine establishing a private communication channel before sharing information. HTTPS helps protect data as it travels between your browser and the website",
    },
    {
        title: "4th Step: Sending the Request",
        description:
            "The browser sends the HTTP request asking the server for a webpage or another resource. The request can include information such as the requested path, browser details, and other headers.",
        example:
            "This is similar to placing an order. Your browser tells the server the resource it's requesting, and the server then receives that request."
    },
{
        title: "5th Step: Server Processing",
        description:
            "The server receives the request and determines how to respond. Depending on the website, it may locate a file, run application code, retrieve information from a database, or perform other operations.",
        example:
            "Think of a restaurant kitchen receiving an order. The kitchen checks what is needed and prepares the requested item before sending it out."
    },
    {
        title: "6th Step: Receiving the Response",
        description:
            "The server sends an HTTP response back to the browser. This includes a status code and may contain HTML, CSS, JavaScript, images, or other resources.",
        example:
            "The response is like receiving your completed order. The status code communicates how the request went, while the response body contains the requested information."
    },
    {
        title: "7th Step: Building the Webpage",
        description:
            "The browser processes the resources it receives. HTML defines the page structure, CSS controls its appearance, and JavaScript can add interactive behavior. The browser also requests additional resources when needed.",
        example:
            "Think of building a house: HTML provides the structure, CSS handles the appearance, and JavaScript adds interactive features that make parts of the experience work."
    },
    {
        title: "8th Step: The Website Appears",
        description:
            "The browser renders the webpage and displays it on your screen. Some resources may continue loading, and JavaScript may update parts of the page after the initial display.",
        example:
            "What appears to be an instant experience is the result of many processes working together. You can now interact with the website because your browser has processed and displayed its content."
    }
];





exploreButton.addEventListener("click", function () {

    let url = urlInput.value.trim();


    urlFeedback.textContent = "";
    urlFeedback.classList.remove("success");
    urlInput.classList.remove("invalid");

  
    if (url === "") {
        urlFeedback.textContent = "Please enter a website URL to begin.";
        urlInput.classList.add("invalid");
        urlInput.focus();
        return;
    }

  
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }

  
    let validatedUrl;

    try {
        validatedUrl = new URL(url);
    } catch (error) {
        urlFeedback.textContent = "Please enter a valid website address.";
        urlInput.classList.add("invalid");
        urlInput.focus();
        return;
    }

  
    if (
        !["http:", "https:"].includes(validatedUrl.protocol) ||
        !validatedUrl.hostname.includes(".") ||
        validatedUrl.hostname.startsWith(".") ||
        validatedUrl.hostname.endsWith(".")
    ) {
        urlFeedback.textContent = "Please enter a valid website address";
        urlInput.classList.add("invalid");
        urlInput.focus();
        return;
    }


    url = validatedUrl.href;

  
    urlFeedback.classList.add("success");

   
    selectedUrl.textContent = "URL: " + url;

    currentStage = 0;
    showStage(currentStage);

    journey.classList.remove("hidden");

});


nextButton.addEventListener("click", function () {

    currentStage++;

    if (currentStage < stages.length) {

        showStage(currentStage);

    } else {
        
        definitionBox.classList.add("hidden");

        stageTitle.textContent = "Journey Complete!";

        stageDescription.textContent =
            "You followed the journey from entering a URL to seeing a website appear on your screen. What looks like an instant action involves multiple systems working together behind the scenes.";

        if (!completionMessage) {

        completionMessage = document.createElement("div");

        completionMessage.className = "completion-message";

        completionMessage.innerHTML = `
            <h4>What You Just Explored</h4>
            <ul>
                <li>Your browser interpreted the URL.</li>
                <li>DNS helped locate the website's server.</li>
                <li>The browser and server communicated through HTTP/HTTPS.</li>
                <li>The server processed the request and returned resources.</li>
                <li>Your browser built and rendered the webpage.</li>
            </ul>
        `;

        stage.appendChild(completionMessage);
}

        progressSteps.forEach(function (step) {
            step.classList.remove("active");
            step.classList.add("completed");
        });

        progressLines.forEach(function (line) {
            line.classList.add("completed");
        });

        nextButton.style.display = "none";

        networkVisual.style.display = "none";
    }
});

backButton.addEventListener("click", function () {

    if (currentStage > 0) {
        currentStage = currentStage - 1;
        showStage(currentStage);
    }

});


function showStage(stageNumber) {

    const stage = stages[stageNumber];

    definitionBox.classList.add("hidden");

    if (completionMessage) {
        completionMessage.remove();
        completionMessage = null;
    }

    stageTitle.textContent = stage.title;
    
    stageDescription.innerHTML = makeTermsClickable(stage.description);

networkNodes.forEach(function (node) {
    node.classList.remove("active");
});

connectionLines.forEach(function (line) {
    line.classList.remove("active");
});


if (stageNumber === 0) {
    networkNodes[0].classList.add("active");
}

if (stageNumber === 1) {
    networkNodes[0].classList.add("active");
    networkNodes[1].classList.add("active");
    connectionLines[0].classList.add("active");
}

if (stageNumber === 2) {
    networkNodes[0].classList.add("active");
    networkNodes[1].classList.add("active");
    networkNodes[2].classList.add("active");
    connectionLines[0].classList.add("active");
    connectionLines[1].classList.add("active");
}

if (stageNumber === 3) {
    networkNodes[0].classList.add("active");
    networkNodes[2].classList.add("active");
    connectionLines[1].classList.add("active");
}

if (stageNumber === 4) {
    networkNodes[2].classList.add("active");
}

if (stageNumber === 5) {
    networkNodes[0].classList.add("active");
    networkNodes[2].classList.add("active");
}

if (stageNumber === 6) {
    networkNodes[0].classList.add("active");
}

if (stageNumber === 7) {
    networkNodes[0].classList.add("active");
}


    networkVisual.style.display = "flex";

    progressSteps.forEach(function (step, index) {

        step.classList.remove("active");
        step.classList.remove("completed");

        if (index < stageNumber) {
            step.classList.add("completed");
        }

        if (index === stageNumber) {
            step.classList.add("active");
        }
    });

    progressLines.forEach(function (line, index) {

        line.classList.remove("completed");

        if (index < stageNumber) {
            line.classList.add("completed");
        }
    });


    if (stageNumber === 0) {
        backButton.style.display = "none";
    } else {
        backButton.style.display = "block";
    }

    nextButton.style.display = "block";
}

function makeTermsClickable(text) {

    const terms = Object.keys(definitions);

    let formattedText = text;

    terms.forEach(function (term) {

        const regex = new RegExp(`\\b${term}\\b`, "g");

        formattedText = formattedText.replace(
            regex,
            `<button class="definition-term" data-term="${term}">${term}</button>`
        );

    });

    stageDescription.addEventListener("click", function (event) {

    if (event.target.classList.contains("definition-term")) {

        const term = event.target.dataset.term;

        showDefinition(term);
    }

});

    return formattedText;
}

urlInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        exploreButton.click();
    }
});