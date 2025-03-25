// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
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
    window.open('./106quiz.html');
}

// On document load, display appropriate content
document.addEventListener("DOMContentLoaded", function () {
    displayLesson();
    console.log('content displayed');
});