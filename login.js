// Switch page to home
function goToHome() {
    window.location.href = './websitetest.html';
}

// Switch to new user page
function goToRegister() {
    window.location.href = './register.html';
}

// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

// Check entered credentials against database of users
async function validateUser() {

    let enteredName = document.getElementById("userName").value; // Entered user name

    let jsData = await fetchData(); // Fetch all users
    let users = jsData[5].members;

    // Get all users with the entered user name
    let matchingUsers = users.filter(user => user.userName === enteredName);
    console.log(matchingUsers);

    if (matchingUsers.length === 0) {
        // If there are no matching users, reload
        window.location.href = './login.html';
    }

    // Get all users (should be 1 or 0) with the entered password
    let enteredPassword = document.getElementById("password").value;
    let matchingPasswords = users.filter(user => user.password === enteredPassword);

    if (matchingPasswords.length === 0) {
        // If there are no matching passwords, reload
        window.location.href = './login.html';
    }

    // Update the database to reflect the logged in user
    jsData[5].members[0].isLoggedIn = 1;
    jsData[5].members[0].userId = matchingPasswords[0].userId;

    fetch('/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsData)
    })
        .then(res => res.text())
        .then(msg => console.log(msg))
        .catch(err => console.error('Save failed', err));
}

// On document load
document.addEventListener("DOMContentLoaded", function () {

    // When form is submitted, validate the user, then proceed as logged in
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        await validateUser();
        goToHome();
    });
});