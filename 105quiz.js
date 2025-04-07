//add here 
function goToQuiz() {
    window.open('./105quiz.html');
}

let qSolutionEls = []; // Store element ID's of the location of the solutions to each question on each page load

// Determine the quiz score, switch the window, and display score
function goToScore() {
    let score = 0;

    for (let i = 0; i < 5; i++) {
        if (document.getElementById(qSolutionEls[i]).checked) {
            score++;
        }
    }

    window.location.href = './105score.html';

    document.getElementById("scoreNum").innerHTML = score;
}

// Fetch data from data.json as an array of objects
async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

// Display object => question => prompt, optionA, optionB, optionC, solution
async function populateQuiz() {
    let jsData = await fetchData();
    let questions = jsData[3].members;

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
    let quizQuestions = questions.filter(question => question.quizID === 1); // 1 is quizID for intro to C++

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
            document.getElementById(`prompt_${i + 1}`).innerHTML = "1. " + question.prompt.replace(/\n/g, "<br />").replace(/\t/g, "&emsp;");

            // Randomize the order of the answer options
            let answers = [question.optionA, question.optionB, question.optionC, question.solution];
            let optionElChars = ['A', 'B', 'C', 'D'];

            for (let j = 4; j >= 1; j--) {
                // Choose a random answer option
                let optionIdx = (j > 1) ? Math.floor(Math.random() * j) : 0;

                // Display that option in the next radio slot
                document.getElementById(`${i + 1}_${optionElChars[4 - j]}`).innerHTML = answers[optionIdx];
                answers.splice(optionIdx, 1);

                // When the solution is picked as the next option, save its radio buttion ID
                if (optionIdx === 3) {
                    qSolutionEls.push(`${i + 1}${optionElChars[4 - j]}`);
                }
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
});