// Fetch data from data.json and display in html
function displayLessonHeader() {
    document.getElementById("lessonHeader").textContent = "Lorem ipsum dolor";
}

function displayLessonContent() {
    document.getElementById("lessonContent").textContent = "Lorem ipsum dolor sit amet";
}

document.addEventListener("DOMContentLoaded", function () {
    displayLessonHeader();
    displayLessonContent();
});