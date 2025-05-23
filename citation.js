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
});
