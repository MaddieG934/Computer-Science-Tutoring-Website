// Switch page to home
function goToHome() {
    sessionStorage.setItem("msg", "");
    window.location.href = './websitetest.html';
}

// Switch to new user page
function goToRegister() {
    sessionStorage.setItem("msg", "");
    window.location.href = './register.html';
}

// Reload this page
function reload() {
    window.location.href = './login.html';
}

// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

// Display login info
async function displayLoginInfo() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        let users = jsData[0].members;
        let matchingUser = users.filter(user => user.userID === loginCheck.userID);
        let userName = matchingUser[0].userName;
        console.log(userName);

        document.getElementById("loginInfo").innerHTML = "Logged in as: " + `${userName}`;
        document.getElementById("loginLink").textContent = "Logout";
    } else {
        document.getElementById("loginInfo").innerHTML = "Logged in as: Guest";
        document.getElementById("loginLink").textContent = "Login";
    }
}

// On click of "Lougout", change 
async function logout() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        loginCheck.isLoggedIn = 0;
        loginCheck.userID = -1;

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
}

// Check entered credentials against database of users
async function validateUser() {

    let enteredName = document.getElementById("userName").value; // Entered user name

    let jsData = await fetchData(); // Fetch all users
    let users = jsData[0].members;

    // Get all users with the entered user name
    let matchingUsers = users.filter(user => user.userName === enteredName);
    console.log(matchingUsers);

    if (matchingUsers.length === 0) {
        // If there are no matching users, return error code 1
        return 1;
    }

    // Get all users (should be 1 or 0) with the entered password
    let enteredPassword = document.getElementById("password").value;
    let matchingPasswords = users.filter(user => user.password === enteredPassword);

    if (matchingPasswords.length === 0) {
        // If there are no matching passwords, return error code 2
        return 2;
    }

    // Update the database to reflect the logged in user
    jsData[5].members[0].isLoggedIn = 1;
    jsData[5].members[0].userID = matchingPasswords[0].userID;

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

    return 0;
}

// On document load
document.addEventListener("DOMContentLoaded", function () {
    displayLoginInfo();
    document.getElementById("errorMsg").innerHTML = sessionStorage.getItem("msg");

    // When form is submitted, validate the user, then proceed as logged in
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        let code = await validateUser();
        console.log(code);

        if (!code) {
            // Proceed to home once user is logged in
            goToHome();
        } else if (code === 1) {
            // Error message when username is incorrect
            sessionStorage.setItem("msg", "Username is not associated with an account");
            reload();
        } else {
            // Error message when password is incorrect
            sessionStorage.setItem("msg", "Password is incorrect");
            reload();
        }
    });

    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        reload();
    });
});