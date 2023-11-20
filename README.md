# Project title - Bootcamper Journal Ritual

# Team Communicators 🚀
Team Members:<br>
Adam - [Github](https://github.com/adamalrasi)<br>
James - [Github](https://github.com/jamesdiffeycoding)<br>
Matthew - [Github](https://github.com/mattkirke)<br>
Jordan - [Github](https://github.com/Jordan-Walters-23)<br>
Wendy - [Github](https://github.com/wendyrich63)<br>
Kat - [Github](https://github.com/KatBaginska)

# Project description

This mobile-first application aims to help School of Code bootcampers quickly reflect on their day with five reflection questions, helping them to maintain a healthy work / rest balance.

# Credits and contacts

This project was made by Wendy Richardson, Jordan Walters, Katarzyna Baginska, Adam Alrasi, James Diffey and Matthew Kirke as part of the School of Code's 15th Bootcamp (w/c 22nd October 2023).

For all enquiries, message a member of the team through James at jamesdiffey@ic.ac.uk.

# How to install and run the project

To run the project, you need the Front-End and Back-End repositories downloaded.

Step by step guide:

-   Download the Front-End and Back-End repositories into one folder called "Bootcamper Journal Ritual".
-   Open this folder in VSCode.
-   Navigate in the terminal with "cd" to the Back-End repository. Install the required modules by running "npm install" in the terminal.
-   Run the reset-db and server scripts with "npm run reset-db" and "npm run dev".
-   Ensure the server is listening on a local port. It will confirm this in the terminal.
-   Open a server with the Live Server extension, navigating to the Front-End project.
-   Open the console by right clicking in the browser > inspect > console, checking that there are no connection errors.
-   Submited a daily journal entry by entering a Secret User ID between 1 and 40, clicking on an emoji, and typing responses to the four questions.
-   Present the "Submit journal entry" button to submit the journal entry. Your data will be sent to the Sequel database, then retrieved again with a fetch command, before being displayed on the webpage.

# Current features

-   Enter one day's journal entry
-   Display previous day's journal entry
-   Functioning requires a declared Secret User ID

Dynamic features:

-   A pop-up appears when journal entry submitted
-   Emojis alight to show which is chosen
-   The journal entry boxes hide when the day's journal has been submitted
-   The journal history log displays for the previous day's journal when the document is loaded, and is updated when the submission button is pressed.

# Sequel database information

-   Can intake information for Secret User ID's 1 through 40.

# Known bugs or limitations

Bugs

-   None outstanding

Limitations

-   Only 40 Secret User IDs have been set up in the Sequel database (Secret User ID 1-->40).
-   Any developer can interact with our database should they find the Sequel API Key. We do not have license requirements setup yet.

# Future features [and estimated development time]

-   Login functionality, so users don't need to enter their Secret ID every time [1 day]
-   Display multiple journal entries [1 day]
-   Edit functionality on posts [2 days]
-   Delete functionality [1 day]
-   A timer to help users focus on their daily extra revision task for twenty minutes [0.5 day]
-   A visual tracker to mark your progress and streaks (i.e. how many days you have completed this ritual) [1 day]
-   An optional, user-customisable motivational quote space [0.5 day]
-   Soothing audio which can be toggled on/off [2 days]
