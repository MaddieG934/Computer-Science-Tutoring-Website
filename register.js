// Switch page to home
function goToHome() {
    sessionStorage.setItem("msg", "");
    window.location.href = './websitetest.html';
}

// Switch to new user page
function goToLogin() {
    sessionStorage.setItem("msg", "");
    window.location.href = './login.html';
}

// Reload this page
function reload() {
    window.location.href = './register.html';
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

// Check entered username against existing usernames and save new user data
async function createAccount() {
    let enteredUserName = document.getElementById("userName").value; // Entered username

    let jsData = await fetchData(); // Fetch all users
    let users = jsData[0].members;

    // Get all users with the entered user name
    let matchingUsers = users.filter(user => user.userName === enteredUserName);
    console.log(matchingUsers);

    if (matchingUsers.length > 0) {
        // If there are any matching users, return error code 1
        return 1;
    }

    // Get the rest of the new user data and create an object
    let enteredPassword = document.getElementById("password").value;
    if (enterdPassword.length === 0) {
        // If the password field is empty, return error code 2
        return 2;
    }

    let newUserId = users[users.length - 1].userID + 1;

    let newUser = {
        "userID": newUserId,
        "userName": enteredUserName,
        "password": enteredPassword,
        "last105Score": 0,
        "last106Score": 0,
        "last220Score": 0,
        "last230Score": 0,
        "max105Score": 0,
        "max106Score": 0,
        "max220Score": 0,
        "max230Score": 0
    }

    users.push(newUser);
    jsData[0].members = users;

    // Update data.json
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

    // When form is submitted, ensure the username is unique, then proceed as logged in
    document.getElementById("registerForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        let code = await createAccount();
        console.log(code);

        if (!code) {
            // Proceed to login once new user is created
            goToLogin();
        } else if (code == 1) {
            // Error message when username is taken
            sessionStorage.setItem("msg", "Username is already associated with an account");
            reload();
        } else {
            sessionStorage.setItem("msg", "Password field is missing");
            reload();
        }
    });

    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        goToLogin();
    });
});