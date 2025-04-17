// Switch page to login page
async function goToLogin() {
    window.location.href = './login.html';
}

// Switch page to 105 lesson page
async function goTo105() {
    window.location.href = './105lesson.html';
}

// Switch page to 106 lesson page
async function goTo106() {
    window.location.href = './106lesson.html';
}

// Switch page to 220 lesson page
async function goTo220() {
    window.location.href = './220lesson.html';
}

// Switch page to 230 lesson page
async function goTo230() {
    window.location.href = './230CourseContent.html';
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

// On attempting to take a course, first check whether the user is logged in
async function checkLogin() {
    let jsData = await fetchData();
    return jsData[5].members[0].isLoggedIn;
}

// On document load, display who is logged in, if any
document.addEventListener("DOMContentLoaded", function () {
    displayLoginInfo();

    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        goToLogin();
    });

    document.getElementById("105-btn").addEventListener("click", function () {
        if (checkLogin()) {
            goTo105();
        } else {
            goToLogin();
        }
    });

    document.getElementById("106-btn").addEventListener("click", function () {
        if (checkLogin()) {
            goTo106();
        } else {
            goToLogin();
        }
    });

    document.getElementById("220-btn").addEventListener("click", function () {
        if (checkLogin()) {
            goTo220();
        } else {
            goToLogin();
        }
    });

    document.getElementById("230-btn").addEventListener("click", function () {
        if (checkLogin()) {
            goTo230();
        } else {
            goToLogin();
        }
    });
});
