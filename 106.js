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
        let matchingUser = users.filter(user => user.userId === loginCheck.userId);
        let userName = matchingUser.userName;

        document.getElementById("loginInfo").innerHTML = "Logged in as: " + `${userName}`;
        document.getElementById("loginLink").innerHTMl = "Logout";
    } else {
        document.getElementById("loginInfo").innerHTML = "Logged in as: Guest";
        document.getElementById("loginLink").innerHTML = "Login";
    }
}

// On click of "Lougout", change 
async function logout() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        loginCheck.isLoggedIn = 0;
        loginCheck.userId = -1;
    }
}

// Display object => lessons => second lesson (106) => header, content
async function displayLesson() {
    let jsData = await fetchData();
    let lesson = jsData[1].members[1];

    if (lesson) {
        document.getElementById("lessonHeader").textContent = lesson.header;
    } else {
        console.error('Lesson not found.');
    }
}

function goToQuiz() {
    window.location.href = './106quiz.html';
}

// On document load, display appropriate content
document.addEventListener("DOMContentLoaded", function () {
    displayLoginInfo();
    displayLesson();
    console.log('content displayed');

    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        goToLogin();
    });
});