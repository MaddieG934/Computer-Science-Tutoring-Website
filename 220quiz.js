let qSolutionEls = []; // Store element ID's of the location of the solutions to each question on each page load

// Switch to display score window
function goToScore() {
    window.location.href = './220score.html';
}

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
        let matchingUser = users.filter(user => user.userId === loginCheck.userId);
        let userName = matchingUser.userName;

        document.getElementById("loginInfo").innerHTML = "Logged in as: " + `${userName}`;
        document.getElementById("loginLink").innerHTMl = "Logout";
    } else {
        document.getElementById("loginInfo").innerHTML = "Logged in as: Guest";
        document.getElementById("loginLink").innerHTML = "Login";
    }
}

// On click of "Lougout", change 
async function logout() {
    let jsData = await fetchData();
    let loginCheck = jsData[5].members[0];

    if (loginCheck.isLoggedIn) {
        loginCheck.isLoggedIn = 0;
        loginCheck.userId = -1;

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

// Determine the quiz score, write to user data, switch to display score window
async function calcScore() {
    // Calc score
    let score = 0;

    for (let i = 0; i < 5; i++) {
        if (document.getElementById(qSolutionEls[i]).checked) {
            score++;
        }
    }

    // Update jsData object
    let jsData = await fetchData();

    if (jsData[0].members[0]) {
        jsData[0].members[0].last106Score = score;

        if (score > jsData[0].members[0].max106Score) {
            jsData[0].members[0].max106Score = score;
        }
    } else {
        error.log('User not found');
    }

    // Write to json file

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

    goToScore(); // Go to score page
}

// Display object => question => prompt, optionA, optionB, optionC, solution
async function populateQuiz() {
    let jsData = await fetchData();
    let questions = jsData[4].members;
    let quizQuestions = questions.filter(question => question.quizID === 3); //updated to 3
	
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
    displayLoginInfo();
    populateQuiz();
    console.log('content displayed');

    // When form is submitted
    document.getElementById("quizForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        await calcScore();
    });

    document.getElementById("loginLink").addEventListener("click", function () {
        logout();
        goToLogin();
    });
});