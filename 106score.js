// Navigate back to the home page
function goToHome() {
    window.location.href = './websitetest.html';
}

// Switch page to login page
async function goToLogin() {
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
    }
}

// Display the quiz score just obtained
async function populateScore() {
    let jsData = await fetchData();
    let user = jsData[0].members[0];

    if (user) {
        document.getElementById("scoreNum").innerHTML = user.last106Score;
    } else {
        error.log('User not found.');
    }
    
}

// On document load, display appropriate content
document.addEventListener("DOMContentLoaded", function () {
    displayLoginInfo();
    populateScore();
    console.log('content displayed');

    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        goToLogin();
    });
});