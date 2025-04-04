let qSolutionEls = []; // Store element ID's of the location of the solutions to each question on each page load

// Switch to display score window
function goToScore() {
    window.location.href = './106score.html';
}

// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

// Determine the quiz score, write to user data, switch to display score window
async function calcScore() {
    let score = 0;

    for (let i = 0; i < 5; i++) {
        if (document.getElementById(qSolutionEls[i]).checked) {
            score++;
        }
    }

    let jsData = await fetchData();
    let user = jsData[0].members[0];

    if (user) {
        user.last106Score = score;

        if (user.last106Score > user.max106Score) {
            user.max106Score = user.last106Score;
        }
    } else {
        error.log('User not found');
    }

    goToScore();
}

// Display object => question => prompt, optionA, optionB, optionC, solution
async function populateQuiz() {
    let jsData = await fetchData();
    let questions = jsData[4].members;

    /*****************************************************************************
     *                                                                           *
     * TO GRILLS WHO WANT TO COPY: YOU ONLY HAVE TO CHANGE 2 (KINDA) THINGS!!!   *
     *                                                                           *
     * 1) Change the line below (most important!!!), see the comment right below *
     *                                                                           *
     * 2) Change the lines under the "Display data" comments, the first of these *
     *    lines has more details in a comment                                    *
     *                                                                           *
     *****************************************************************************/
    let quizQuestions = questions.filter(question => question.quizID === 2); // Change "2" to the correct quizID, all questions for the same quiz should have the same quizID

    console.log(quizQuestions);

    if (quizQuestions) {
        // Display 5 random questions, answer options in a random order

        let indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = 0; i < 5; i++) {
            // Pull question from the data
            let qIdx = indices[Math.floor(Math.random() * (10 - i))];
            let question = quizQuestions[qIdx];
            indices.splice(indices.indexOf(qIdx), 1);

            // Display prompt
            document.getElementById(`prompt_${i + 1}`).innerHTML = `${i + 1}` + ". " + question.prompt.replace(/\n/g, "<br />").replace(/\t/g, "&emsp;");

            // Randomize the order of the answer options
            let answers = [question.optionA, question.optionB, question.optionC, question.solution];
            let optionElChars = ['A', 'B', 'C', 'D'];

            for (let j = 4; j >= 1; j--) {
                // Choose a random answer option
                let optionIdx = (j > 1) ? Math.floor(Math.random() * j) : 0;
                
                // Display that option in the next radio slot
                document.getElementById(`${i + 1}_${optionElChars[4 - j]}`).innerHTML = answers[optionIdx];

                // When the solution is picked as the next option, save its radio buttion ID
                if (answers[optionIdx] === question.solution) {
                    console.log("Adding " + `${i + 1}${optionElChars[4 - j]}` + " to qSolutionEls");
                    qSolutionEls.push(`${i + 1}${optionElChars[4 - j]}`);
                }

                answers.splice(optionIdx, 1);
            }
        }
    } else {
        console.error('Questions not found.');
    }
}

// On document load, display appropriate content
document.addEventListener("DOMContentLoaded", function () {
    populateQuiz();
    console.log('content displayed');

    // When form is submitted
    document.getElementById("quizForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        await calcScore();
    });
});