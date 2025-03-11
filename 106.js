// Fetch data from data.json and display in html
document.addEventListener("DOMContentLoaded", function () {
    displayLesson();
    console.log('content displayed');
});

// Display object => lessons => second lesson (106) => header, content
function displayLesson() {
    let jsData = {};
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            jsData = data;
            console.log(jsData);
        })
        .catch(error => {
            console.error('Error fetching JSON data: ', error);
        });

    let lesson = jsData[1].lessons[1];
    console.log(lesson);

    if (lesson) {
        document.getElementById("lessonHeader").textContent = lesson.header;
        document.getElementById("lessonContent").textContent = lesson.content;
    } else {
        console.error('Lesson not found.');
    }
}