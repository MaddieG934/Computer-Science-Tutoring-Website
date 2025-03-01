// Fetch data from data.json and display in html
let jsData = {};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        jsData = data;
        console.log(jsData);

        document.addEventListener("DOMContentLoaded", function () {
            displayLessonHeader();
            displayLessonContent();
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data: ', error);
    });

// Display object => lessons => second lesson (106) => header
function displayLessonHeader() {
    let lesson = jsData[1].lessons.find(lesson => lesson.lessonID === 2);
    if (lesson) {
        document.getElementById("lessonHeader").textContent = lesson.header;
    } else {
        console.error('Lesson not found.');
    }
}

// Display object => lessons => second lesson (106) => content
function displayLessonContent() {
    let lesson = jsData[1].lessons.find(lesson => lesson.lessonID === 2);
    if (lesson) {
        document.getElementById("lessonContent").textContent = lesson.content;
    } else {
        console.error('Lesson not found.');
    }
}