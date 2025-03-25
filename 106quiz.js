// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

// Display object => question
async function populateQuiz() {
    let jsData = await fetchData();
    let questions = jsData[3].members;
    let quizQuestions = questions.filter(question => question.quizID === 2);

    console.log(quizQuestions);

    if (quizQuestions) {
        // Display 5 random questions, answer options in a random order

        let indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // Pull question 1 from the data
        let qIdx = indices[Math.floor(Math.random() * 10)];
        let question = quizQuestions[qIdx];
        indices.splice(indices.indexOf(qIdx), 1);

        // Display prompt
        document.getElementById("prompt_1").innerHTML = question.prompt.replace(/\n/g, "<br />").replace(/\t/g, "&emsp;");

        // Randomize the order of the answer options
        let answers = [question.optionA, question.optionB, question.optionC, question.solution];
        for (let i = 0; i < 5; i++) {
            // Swap 2 random elements in the answer list 5 times
            let idx1 = Math.floor(Math.random() * 4);
            let idx2;
            do {
                idx2 = Math.floor(Math.random() * 4);
            } while (idx2 === idx1);

            let temp = answers[idx1];
            answers[idx1] = answers[idx2];
            answers[idx2] = temp;
        }

        // Display and style data
        document.getElementById("1_A").innerHTML = answers[0];
        document.getElementById("1_B").innerHTML = answers[1];
        document.getElementById("1_C").innerHTML = answers[2];
        document.getElementById("1_D").innerHTML = answers[3];

        // Pull question 2 from the data
        qIdx = indices[Math.floor(Math.random() * 9)];
        question = quizQuestions[qIdx];
        indices.splice(indices.indexOf(qIdx), 1);

        // Display prompt
        document.getElementById("prompt_2").innerHTML = question.prompt.replace(/\n/g, "<br />").replace(/\t/g, "&emsp;");

        // Randomize the order of the answer options
        answers = [question.optionA, question.optionB, question.optionC, question.solution];
        for (let i = 0; i < 5; i++) {
            // Swap 2 random elements in the answer list 5 times
            let idx1 = Math.floor(Math.random() * 4);
            let idx2;
            do {
                idx2 = Math.floor(Math.random() * 4);
            } while (idx2 === idx1);

            let temp = answers[idx1];
            answers[idx1] = answers[idx2];
            answers[idx2] = temp;
        }

        // Display and style data
        document.getElementById("2_A").innerHTML = answers[0];
        document.getElementById("2_B").innerHTML = answers[1];
        document.getElementById("2_C").innerHTML = answers[2];
        document.getElementById("2_D").innerHTML = answers[3];

        // Pull question 3 from the data
        qIdx = indices[Math.floor(Math.random() * 8)];
        question = quizQuestions[qIdx];
        indices.splice(indices.indexOf(qIdx), 1);

        // Display prompt
        document.getElementById("prompt_3").innerHTML = question.prompt.replace(/\n/g, "<br />").replace(/\t/g, "&emsp;");

        // Randomize the order of the answer options
        answers = [question.optionA, question.optionB, question.optionC, question.solution];
        for (let i = 0; i < 5; i++) {
            // Swap 2 random elements in the answer list 5 times
            let idx1 = Math.floor(Math.random() * 4);
            let idx2;
            do {
                idx2 = Math.floor(Math.random() * 4);
            } while (idx2 === idx1);

            let temp = answers[idx1];
            answers[idx1] = answers[idx2];
            answers[idx2] = temp;
        }

        // Display and style data
        document.getElementById("3_A").innerHTML = answers[0];
        document.getElementById("3_B").innerHTML = answers[1];
        document.getElementById("3_C").innerHTML = answers[2];
        document.getElementById("3_D").innerHTML = answers[3];

        // Pull question 4 from the data
        qIdx = indices[Math.floor(Math.random() * 7)];
        question = quizQuestions[qIdx];
        indices.splice(indices.indexOf(qIdx), 1);

        // Display prompt
        document.getElementById("prompt_4").innerHTML = question.prompt.replace(/\n/g, "<br />").replace(/\t/g, "&emsp;");

        // Randomize the order of the answer options
        answers = [question.optionA, question.optionB, question.optionC, question.solution];
        for (let i = 0; i < 5; i++) {
            // Swap 2 random elements in the answer list 5 times
            let idx1 = Math.floor(Math.random() * 4);
            let idx2;
            do {
                idx2 = Math.floor(Math.random() * 4);
            } while (idx2 === idx1);

            let temp = answers[idx1];
            answers[idx1] = answers[idx2];
            answers[idx2] = temp;
        }

        // Display the data
        document.getElementById("4_A").innerHTML = answers[0];
        document.getElementById("4_B").innerHTML = answers[1];
        document.getElementById("4_C").innerHTML = answers[2];
        document.getElementById("4_D").innerHTML = answers[3];

        // Pull question 5 from the data
        qIdx = indices[Math.floor(Math.random() * 6)];
        question = quizQuestions[qIdx];

        // Display prompt
        document.getElementById("prompt_5").innerHTML = question.prompt.replace(/\n/g, "<br />").replace(/\t/g, "&emsp;");

        // Randomize the order of the answer options
        answers = [question.optionA, question.optionB, question.optionC, question.solution];
        for (let i = 0; i < 5; i++) {
            // Swap 2 random elements in the answer list 5 times
            let idx1 = Math.floor(Math.random() * 4);
            let idx2;
            do {
                idx2 = Math.floor(Math.random() * 4);
            } while (idx2 === idx1);

            let temp = answers[idx1];
            answers[idx1] = answers[idx2];
            answers[idx2] = temp;
        }

        // Display and style data
        document.getElementById("5_A").innerHTML = answers[0];
        document.getElementById("5_B").innerHTML = answers[1];
        document.getElementById("5_C").innerHTML = answers[2];
        document.getElementById("5_D").innerHTML = answers[3];

    } else {
        console.error('Questions not found.');
    }
}

// On document load, display appropriate content
document.addEventListener("DOMContentLoaded", function () {
    populateQuiz();
    console.log('content displayed');
});