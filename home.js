// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

// Switch page to login page
async function goToLogin() {
    window.location.href = './login.html';
}

// Switch page to 105 lesson page
async function goTo105() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        window.location.href = './105lesson.html';
    } else {
        goToLogin();
    }
}

// Switch page to 106 lesson page
async function goTo106() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        window.location.href = './106lesson.html';
    } else {
        goToLogin();
    }
}

// Switch page to 220 lesson page
async function goTo220() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        window.location.href = './220lesson.html';
    } else {
        goToLogin();
    }
}

// Switch page to 230 lesson page
async function goTo230() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        window.location.href = './230CourseContent.html';
    } else {
        goToLogin();
    }
}

// Display login info
async function displayLoginInfo() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        let users = jsData[0].members;
        let matchingUser = users.filter(user => user.userID === loginCheck.userID);
        let userName = matchingUser[0].userName;

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

// On document load, display who is logged in, if any
document.addEventListener("DOMContentLoaded", function () {
    displayLoginInfo();

    // If user decides to log out
    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        goToLogin();
    });

    // On clicking any "take lesson" button, proceed to that lesson if the user is logged in
    document.getElementById("105-btn").addEventListener("click", function () {
        goTo105();
    });

    document.getElementById("106-btn").addEventListener("click", function () {
        goTo106();
    });

    document.getElementById("220-btn").addEventListener("click", function () {
        goTo220();
    });

    document.getElementById("230-btn").addEventListener("click", function () {
        goTo230();
    });
});
