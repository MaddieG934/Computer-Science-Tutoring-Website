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

//// Display object => lessons => second lesson (105) => header, content
//async function displayLesson() {
//    let jsData = await fetchData();
//    let lesson = jsData[2].members[1];

//    if (lesson) {
//        document.getElementById("lessonHeader").textContent = lesson.header;

//    } else {
//        console.error('Lesson not found.');
//    }
//}

function goToQuiz() {
    window.location.href = './105quiz.html';
}

// On document load, display appropriate content
document.addEventListener("DOMContentLoaded", function () {
    displayLoginInfo();
    //displayLesson();
    //console.log('content displayed');

    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        goToLogin();
    });
});