
const urlInput = document.getElementById("urlInput");
const exploreButton = document.getElementById("exploreButton");

const journey = document.getElementById("journey");
const selectedUrl = document.getElementById("selectedUrl");

const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");

const nextButton = document.getElementById("nextButton");



const stages = [
    {
        title: "Step 1: Entering the URL",
        description:
            "Your browser begins the journey by taking the URL you entered and preparing to find the website you requested."
    },
    {
        title: "Step 2: Finding the Server",
        description:
            "Your browser needs to find the server where the website is hosted. It uses DNS to translate the domain name into an IP address."
    },
    {
        title: "Step 3: Connecting to the Server",
        description:
            "Once the server's IP address is known, your browser establishes a connection with that server."
    },
    {
        title: "Step 4: Sending the Request",
        description:
            "Your browser sends an HTTP request to the server asking for the resources needed to display the website."
    }
];



let currentStage = 0;




exploreButton.addEventListener("click", function () {


    const url = urlInput.value.trim();


    if (url === "") {
        alert("Please enter a URL first.");
        return;
    }


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

        stageTitle.textContent = "Journey Complete!";
        stageDescription.textContent =
            "Your browser has received the information it needs to begin displaying the website.";


        nextButton.style.display = "none";
    }
});




function showStage(stageNumber) {

    const stage = stages[stageNumber];

    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;


    nextButton.style.display = "block";
}