// Navigate back to the home page
function goToHome() {
    window.location.href = './websitetest.html';
}

// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

// Display the quiz score just obtained
async function populateScore() {
    let jsData = await fetchData();
    let user = jsData[0].members[0];

    if (user) {
        document.getElementById("scoreNum").innerHTML = user.last230Score;
    } else {
        error.log('User not found.');
    }
    
}

// On document load, display appropriate content
document.addEventListener("DOMContentLoaded", function () {
    populateScore();
    console.log('content displayed');
});