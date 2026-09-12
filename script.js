
const urlInput = document.getElementById("urlInput");
const exploreButton = document.getElementById("exploreButton");

const journey = document.getElementById("journey");
const selectedUrl = document.getElementById("selectedUrl");

const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");

const nextButton = document.getElementById("nextButton");

const backButton = document.getElementById("backButton");



const stages = [
    {
        title: " 1st Step: Entering the URL",
        description:
            "Your browser starts by taking the URL that was entered. Then the URL lets the browser know which website and resource you want to access."
    },
    {
        title: "2nd Step: Finding the Server",
        description:
            "Your browser finds the server where the website is hosted. DNS, or the Domain Name System, translates the website's domain name into an IP address that computers can use to locate the server."
    },
    {
        title: "3rd Step: Establishing a Connection",
        description:
            "Once the server's IP address is known, your browser establishes a connection with the server. For an HTTPS website, this also includes setting up a secure connection."
    },
    {
        title: "4th Step: Sending the Request",
        description:
            "Your browser sends an HTTP request to the server asking for the resources needed to display the website."
    },
    {
        title: "5th Step: Server Processing",
        description:
            "The server receives the request and determines what information or resources it needs to send back. This may involve processing code, accessing a database, or locating files."
    },
    {
        title: "6th Step: Receiving the Response",
        description:
            "The server sends an HTTP response back to your browser. The response can include HTML, CSS, JavaScript, images, and other resources needed by the website."
    },
    {
        title: "7th Step: Building the Webpage",
        description:
            "Your browser processes the resources it received. It uses HTML to create the structure of the page, CSS to control its appearance, and JavaScript to provide interactive behavior."
    },
    {
        title: "8th Step: The Website Appears",
        description:
            "After processing the necessary resources, your browser renders the webpage and displays it on your screen. What looked like a simple click or URL entry actually involved many steps happening behind the scenes."
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
            "The browser has processed the resources it received and rendered the webpage. You have now followed the journey from entering a URL to seeing a website appear on your screen.";

        nextButton.style.display = "none";
    }
});

backButton.addEventListener("click", function () {

    if (currentStage > 0) {
        currentStage--;
        showStage(currentStage);
    }
});



function showStage(stageNumber) {

    const stage = stages[stageNumber];

    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;

    if (stageNumber === 0) {
        backButton.style.display = "none";
    } else {
        backButton.style.display = "block";
    }


    nextButton.style.display = "block";
}

urlInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        exploreButton.click();
    }
});