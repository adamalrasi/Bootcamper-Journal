console.log("-----CONNECT TO THE MAIN.JS---------");
// Users //////////////////////////////////////////////////////////////////////////////////
const userSection = document.querySelector(".user-section");
const userIDbox = document.querySelector("#user-id-input");
let userID = userIDbox.value || 1;
// Variables/QuerySelectors ///////////////////////////////////////////////////////////////
// Main Container--------------------------------------
const bodyContainer = document.querySelector(".body-container");
// Header Container
const headerContainer = document.querySelector(".header-container");

// Questions Container--------------------------------
const qsContainer = document.querySelector(".qs-container");
// Questions Emojis Section
const qsEmojisSection = document.querySelector(".qs-emojis-section");

// Questions emoji icons at top of page
const emoji1top = document.querySelector(".emoji-1");
const emoji2top = document.querySelector(".emoji-2");
const emoji3top = document.querySelector(".emoji-3");
const emoji4top = document.querySelector(".emoji-4");
const emoji5top = document.querySelector(".emoji-5");

// Questions Written Section
const qsWrittenSection = document.querySelector(".qs-written-section");
// Questions Written Block-- Start of a Written Block
const qsWrittenBlock = document.querySelector(".qs-written-block");
// Questions Written Block Prompt
const qsWrittenBlockPrompt = document.querySelector(".qs-written-block-prompt");
// Questions Written Block Textarea
const qsWrittenBlockTextarea = document.querySelector(
    ".qs-written-block-textarea"
);
// Written Block input field

// Questions entries are Number and linked via IDs
// textarea 2
const qsWrittenEntry2 = document.querySelector("#question-number2");
// textarea 3
const qsWrittenEntry3 = document.querySelector("#question-number3");
// textarea 4
const qsWrittenEntry4 = document.querySelector("#question-number4");
// textarea 5
const qsWrittenEntry5 = document.querySelector("#question-number5");

// End of a Written Block

// Questions Button Section
const qsContainerButton = document.querySelector(".qs-container-button");

// Journal Section------------------------------------
const journalSection = document.querySelector(".journal-section");
// Journal Title
const journalTitle = document.querySelector(".journal-title");
// Journal Day Block
const journalDayBlock = document.querySelector(".journal-day-block");
// Journal Day Date
const journalDayDate = document.querySelector(".journal-day-date");
// Journal Day Text
const journalDayText = document.querySelector(".journal-day-text");
// Journal Day Answer 1 Emoji and text
const journalDayTextAnswer1 = document.querySelector(".journal-answer-1");
const journalDayEmojiAnswer1 = document.querySelector(
    "#journal-day-answer-emoji-1"
);
const journalDayEmojiContainer = document.querySelector(
    ".journal-day-emoji-container"
);

// Journal Day Answer 2
const journalDayTextAnswer2 = document.querySelector(".journal-answer-2");
// Journal Day Answer 3
const journalDayTextAnswer3 = document.querySelector(".journal-answer-3");
// Journal Day Answer 4
const journalDayTextAnswer4 = document.querySelector(".journal-answer-4");
// Journal Day Answer 5
const journalDayTextAnswer5 = document.querySelector(".journal-answer-5");
// Popup notification
const popUpNotification = document.querySelector(".popup-notification");

// Date //////////////////////////////////////////////////////////////////////////////////////
// Date format = date: "2023-10-13",
const dateNow = new Date();
const todayDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDay()}`;
// console.log(typeof todayDate, todayDate);
// Helper functions -- Fetch to Server ///////////////////////////////////////////////////////

// CREATE: POST/Fetch Request to the Server
async function sendDataToDatabase(e) {
    e.preventDefault();

    // Store all the new Data from the question section
    const data = new FormData(qsContainer);
    /* note: emoji response value defined elsewhere */
    let userID = userIDbox.value;
    console.log(userID);
    let qsWrittenEntryValues2 = qsWrittenEntry2.value || "No answer provided.";
    let qsWrittenEntryValues3 = qsWrittenEntry3.value || "No answer provided.";
    let qsWrittenEntryValues4 = qsWrittenEntry4.value || "No answer provided.";
    let qsWrittenEntryValues5 = qsWrittenEntry5.value || "No answer provided.";
    // !!!Check if the Submit is working
    console.log("Input1: " + emojiChosenAtTop);
    console.log("Input2: " + qsWrittenEntryValues2);
    console.log("Input3: " + qsWrittenEntryValues3);
    console.log("Input4: " + qsWrittenEntryValues4);
    console.log("Input5: " + qsWrittenEntryValues5);

    // Hide all the entries points
    hideAllEntries();

    // Empty all the question Written blocks
    qsContainer.reset();

    // Send a Fetch/POST Request to the Server
    const response = await fetch(
        `https://backend-w8-hackathon-project.onrender.com/entries`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // date: todayDate,
                date: "2210-10-20",
                bc_id: userID,
                happy_ind: emojiChosenAtTop,
                q_1_ans: qsWrittenEntryValues2,
                q_2_ans: qsWrittenEntryValues3,
                q_3_ans: qsWrittenEntryValues4,
                q_4_ans: qsWrittenEntryValues5,
            }),
        }
    );

    // If Statement - Check if response.ok is true
    if (response.ok) {
        // Store the json response
        const data = await response.json();
        // !!!Check if the data is correct
        console.log("POST: " + data);
        // Popup to notify the user, new entry sent
        displayPopUpForNewData();
    } else {
        // console.log error message
        const error = await response.text();
        console.log(error);
    }
    // Update the Journal Area with new Data
    getAllDataFromServer();
}

// READ: GET/Fetch Request to the Server
async function getAllDataFromServer(e) {
    // e.preventDefault();
    let userID = userIDbox.value || 1;

    // Store all the new Data from the question section
    const data = new FormData(journalSection);

    // Send a Fetch/GET Request to the Server
    const response = await fetch(
        `https://backend-w8-hackathon-project.onrender.com/entries/${userID}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        // Store the json response
        const data = await response.json();
        // !!!Check if the data is correct
        console.log(data.data);

        // Changing the UI to match the Database
        await displayAllJournalData(data.data);
    } else {
        // console.log error message
        const error = await response.text();
        console.log(error);
    }
}

// Display all the journal entries
function convertSequelDateToReadableDate(dateInSequelFormat) {
    let year = "";
    let month = "";
    let day = "";

    year = year.concat(
        dateInSequelFormat.charAt(0),
        dateInSequelFormat.charAt(1),
        dateInSequelFormat.charAt(2),
        dateInSequelFormat.charAt(3)
    );
    month = month.concat(
        dateInSequelFormat.charAt(5),
        dateInSequelFormat.charAt(6)
    );
    day = day.concat(
        dateInSequelFormat.charAt(8),
        dateInSequelFormat.charAt(9)
    );

    let dateInCorrectedFormat = `Date: ${day}-${month}-${year}`;
    return dateInCorrectedFormat;
}
// Function to display journal emoji
function createEmojiForJournal(imageSource) {
    var imgObject = document.createElement("IMG");
    imgObject.setAttribute("src", imageSource);
    imgObject.setAttribute("width", "30");
    imgObject.setAttribute("height", "30");
    imgObject.setAttribute("alt", "Emoji In Journal");
    journalDayEmojiContainer.removeChild(
        journalDayEmojiContainer.children[0]
    ); /* replace existing emoji */
    journalDayEmojiContainer.appendChild(imgObject); /* add new emoji */
}

async function displayAllJournalData(data) {
    console.log(data);
    let allDataEntries = "";

    // loop through all journal entries
    for (let i = 0; i < data.length; i++) {
        journalDayDate.textContent = convertSequelDateToReadableDate(
            data[i].date
        );
        //emoji display switch statement that passes in different emoji file paths
        switch (data[i].happy_ind) {
            case 1:
                createEmojiForJournal("./images/Emojis/Emoji 1.png");
                break;
            case 2:
                createEmojiForJournal("./images/Emojis/Emoji 2.png");
                break;
            case 3:
                createEmojiForJournal("./images/Emojis/Emoji 3.png");
                break;
            case 4:
                createEmojiForJournal("./images/Emojis/Emoji 4.png");
                break;
            case 5:
                createEmojiForJournal("./images/Emojis/Emoji 5.png");
                break;
            default:
                journalDayEmojiAnswer1.src = "./images/emojis/Emoji 3.png";
        }
        //text response display
        journalDayTextAnswer1.innerHTML = "";
        journalDayTextAnswer2.innerHTML = data[i].q_1_ans;
        journalDayTextAnswer3.innerHTML = data[i].q_2_ans;
        journalDayTextAnswer4.innerHTML = data[i].q_3_ans;
        journalDayTextAnswer5.innerHTML = data[i].q_4_ans;
    }
}

// Display a popup for submitting a new journal entry
function displayPopUpForNewData() {
    // alert("✅New Journal Entry Added😎");
    // Create a popup container and add the css class .popup, append the popup with 3s timer
    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = "✅ New Entry, Well Done! 🙌";
    popUpNotification.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Hide everything after journal entries
function hideAllEntries() {
    qsContainer.style.display = "none";
    // User ID
    userSection.style.display = "none";

    // Journal Section
    journalSection.style.marginTop = "-80px";
}

// Event Listeners //////////////////////////////////////////////////////////////////////////////
// Questions Container/POST Form
qsContainer.addEventListener("submit", sendDataToDatabase);

// Functions for emoji event listeners
let emojiChosenAtTop = "3";

// Emojis at top of page --------
let whiteEmojiBackdrop =
    "drop-shadow(2px 2px 0 rgba(240, 250, 222, 0.5)) drop-shadow(-2px -2px 0 rgba(240, 250, 222, 0.5)) drop-shadow(2px -2px 0 rgba(240, 250, 222, 0.5)) drop-shadow(-2px 2px 0 rgba(240, 250, 222, 0.5))";
let purpleEmojiBackdrop =
    "drop-shadow(2px 2px 0 rgba(31, 21, 145, 0.3)) drop-shadow(-2px -2px 0 rgba(31, 21, 145, 0.3)) drop-shadow(2px -2px 0 rgba(31, 21, 145, 0.3)) drop-shadow(-2px 2px 0 rgba(31, 21, 145, 0.3))";

emoji1top.addEventListener("click", function () {
    emojiChosenAtTop = 1;
    console.log("Emoji 1 clicked");
    /*boxhighlight*/
    emoji1top.style.filter = whiteEmojiBackdrop;
    emoji2top.style.filter = purpleEmojiBackdrop;
    emoji3top.style.filter = purpleEmojiBackdrop;
    emoji4top.style.filter = purpleEmojiBackdrop;
    emoji5top.style.filter = purpleEmojiBackdrop;
});
emoji2top.addEventListener("click", function () {
    emojiChosenAtTop = 2;
    console.log("Emoji 2 clicked");
    /*boxhighlight*/
    emoji2top.style.filter = whiteEmojiBackdrop;
    emoji1top.style.filter = purpleEmojiBackdrop;
    emoji3top.style.filter = purpleEmojiBackdrop;
    emoji4top.style.filter = purpleEmojiBackdrop;
    emoji5top.style.filter = purpleEmojiBackdrop;
});
emoji3top.addEventListener("click", function () {
    emojiChosenAtTop = 3;
    console.log("Emoji 3 clicked");
    /*boxhighlight*/
    emoji3top.style.filter = whiteEmojiBackdrop;
    emoji1top.style.filter = purpleEmojiBackdrop;
    emoji2top.style.filter = purpleEmojiBackdrop;
    emoji4top.style.filter = purpleEmojiBackdrop;
    emoji5top.style.filter = purpleEmojiBackdrop;
});
emoji4top.addEventListener("click", function () {
    emojiChosenAtTop = 4;
    console.log("Emoji 4 clicked");
    /*boxhighlight*/
    emoji4top.style.filter = whiteEmojiBackdrop;
    emoji1top.style.filter = purpleEmojiBackdrop;
    emoji2top.style.filter = purpleEmojiBackdrop;
    emoji3top.style.filter = purpleEmojiBackdrop;
    emoji5top.style.filter = purpleEmojiBackdrop;
});
emoji5top.addEventListener("click", function () {
    emojiChosenAtTop = 5;
    console.log("Emoji 5 clicked");
    /*boxhighlight*/
    emoji5top.style.filter = whiteEmojiBackdrop;
    emoji1top.style.filter = purpleEmojiBackdrop;
    emoji2top.style.filter = purpleEmojiBackdrop;
    emoji3top.style.filter = purpleEmojiBackdrop;
    emoji4top.style.filter = purpleEmojiBackdrop;
});

// Journal Section/GET Form
getAllDataFromServer();

// Questions Prompts ///////////////////////////////////////////////////////////////////////////

//Initial styling for emojis
// note: there is no particular reason why these are here except that I couldn't get them to work directly in CSS for some reason.
emoji1top.style.filter = purpleEmojiBackdrop;
emoji2top.style.filter = purpleEmojiBackdrop;
emoji3top.style.filter = purpleEmojiBackdrop;
emoji4top.style.filter = purpleEmojiBackdrop;
emoji5top.style.filter = purpleEmojiBackdrop;
